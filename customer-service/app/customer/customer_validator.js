const { Http } = require('@status/codes');
const Joi = require('joi');

exports.fund = (req, res, next) => {
    console.log("=========Fund validation=========")
    try {
        const schema = Joi.object({
            amount: Joi.number().min(1).required(),
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
    }
    return next();
}

exports.validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
}