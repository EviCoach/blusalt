const { Http } = require('@status/codes');
const Joi = require('joi');

exports.fund = (req, res, next) => {
    console.log("=========Fund validation=========")
    try {
        const schema = Joi.object({
            amount: Joi.number().required(),
            customerId: Joi.string().required(),
            // createdAt: Joi.date().required()
        });

        const value = schema.validate(req.body, { abortEarly: false });
        if (value && value.error) {
            const errors = value.error.details.map((detail) => {
                return { key: detail.path[0], message: detail.message.replace(/['"]/g, '') }
            });
            return res.status(Http.BadRequest).json(errors);
        }
    } catch (err) {
        next(err);
    }
    return next();
}