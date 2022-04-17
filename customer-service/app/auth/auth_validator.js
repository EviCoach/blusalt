const { Http } = require("@status/codes");
const Joi = require("joi");
var jwt = require('jsonwebtoken');
const { TOKEN_KEY } = require("../../config/constants");

exports.login = (req, res, next) => {
    console.log("=========Customer login validation=========");
    try {
        const schema = Joi.object({
            userId: Joi.string().required().messages({ 
                "string.base": `Email or phonenumber should be a type of string`,
                "string.empty": `Email or phonenumber must contain value`,
                "any.required": `Email or phonenumber is required`
            }),
            password: Joi.string().required()
        });

        const value = schema.validate(req.body, { abortEarly: false });
       
        if (value && value.error) {
            const errors = value.error.details.map((detail) => {
                return { key: detail.path[0], message: detail.message.replace(/['"]/g, '') }
            });
            return res.status(Http.BadRequest).json(errors);
        }
    } catch (err) {
        console.log("New post validation error", err);
        next(err);
    }
    return next();
}

exports.signup = (req, res, next) => {
    console.log("=========Customer signup validation=========");
    try {
        const schema = Joi.object({
            firstName: Joi.string().required(),
            lastName: Joi.string().required(),
            email: Joi.string().email().required(),
            phonenumber: Joi.string().required(),
            password: Joi.string().required()
        });

        const value = schema.validate(req.body, { abortEarly: false });
        if (value && value.error) {
            const errors = value.error.details.map((detail) => {
                return { key: detail.path[0], message: detail.message.replace(/['"]/g, '') }
            });
            return res.status(Http.BadRequest).json(errors);
        }
    } catch (err) {
        console.log("New post validation error", err);
        next(err);
    }
    return next();
}

exports.authenticate = (req, res, next) => {
    const bearerHeader = req.body.token || req.query.token || req.headers["authorization"];
    if (!bearerHeader) {
        return res.status(Http.Forbidden).json({
            error: "A token is required for authentication"
        });
    }
    try {
        const token = bearerHeader.split(' ')[1];
        const decoded = jwt.verify(token, TOKEN_KEY);
        console.log("Decoded user ", decoded);
        req.user = decoded;
    } catch (err) {
        console.log("Token error: ", err);
        return res.status(Http.BadRequest).json({
            error: "Invalid token"
        });
    }
    return next();
}