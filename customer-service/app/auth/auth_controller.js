const { Http } = require('@status/codes');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');
const { EMIT, TOKEN_KEY } = require('../../config/constants');
const { Emitter } = require('../../startups/listeners');
const customerRepository = require('../customer/customer_repository');
const { validateEmail } = require('../customer/customer_validator');

/*
Get user input.
Validate user input.
Validate if the user already exists.
Encrypt the user password.
Create a user in our database.
And finally, create a signed JWT token.
*/

const authRepository = require('./auth_repository');

exports.login = async (req, res, next) => {
    const { userId, password } = req.body;
    const isEmail = validateEmail(userId);
    let customerAuth;
    if (isEmail) {
        customerAuth = await authRepository.findOne({ email: userId });
        if (!customerAuth) return res.status(Http.NotFound).json({
            message: "User with this email does not exist. Signup"
        });
    }

    if (!isEmail) {
        customerAuth = await authRepository.findOne({ phonenumber: userId });
        if (!customerAuth) return res.status(Http.NotFound).json({
            message: "User with this phone number does not exist. Signup"
        });
    }

    if (!customerAuth.verified) {
        return res.status(Http.Forbidden).json({
            error: "Please verify your account!"
        });
    }
    const isValid = await bcrypt.compare(password, customerAuth.password);

    if (!isValid) {
        return res.status(Http.Forbidden).json({
            message: "Invalid username or password"
        });
    }
    let user = await customerRepository.findOne({ email: customerAuth.email });
    user = JSON.parse(JSON.stringify(user));
    console.log("User json ", user);

    const token = jwt.sign(user, TOKEN_KEY, { expiresIn: "2h" });
    user.token = token;

    res.json({ message: "Login success", data: user });
}

exports.signup = async (req, res, next) => {
    try {
        const { firstName, lastName, email, phonenumber, password } = req.body;
        // const name = email.split("@")[0];
        let auth = await authRepository.findOne({
            [Op.or]: [
                { email },
                { phonenumber }
            ]
        });
        if (auth) {
            return res.status(Http.BadRequest).json({
                message: "User already exists. Please login."
            });
        }

        // Encrypt user password
        const hashedPassword = await bcrypt.hash(password, 10);
        auth = await authRepository.create({
            email,
            phonenumber,
            password: hashedPassword
        });

        console.log("Created user: ", auth);
        Emitter.emit(EMIT.CUSTOMER.CREATED, { firstName, lastName, email, phonenumber });
        res.json({
            message: "User created",
            data: auth
        });
    } catch (err) {
        // throw new Error(err);
        next(err);
    }
}

exports.reset = async (req, res, next) => {

}

exports.code = async (req, res, next) => {

}

exports.verify = async (req, res, next) => {
    const { uuid } = req.params;
    try {
        const customerAuth = await authRepository.findOne({ uuid });
        if (!customerAuth) {
            return res.status(Http.BadRequest).json({
                "error": "User with this id does not exist"
            });
        }

        await authRepository.update({ uuid }, {
            verified: true
        });

        return res.json({
            message: "User verified successfully",
        });
    } catch (err) {
        next(err);
    }
}