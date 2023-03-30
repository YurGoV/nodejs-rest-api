const Joi = require('joi');
const {email} = require('./joiTemplates')

const userSchema = Joi.object().keys({
        email: email.required(),
    }
);

module.exports = {
    repeatedVerifyMwr: (req, res, next) => {
        const validationResult = userSchema.validate(req.body);
        if (validationResult.error) {
            return res.status(400).json({error: validationResult.error.message})
        }
        next();
    },
};