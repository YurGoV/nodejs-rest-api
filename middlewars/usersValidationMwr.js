const Joi = require('joi');
const {email, password} = require('./joiTemplates')

const userSchema = Joi.object().keys({
        email: email.required(),
        password: password.required(),
    }
);

module.exports = {
    authUserValidateMwr: (req, res, next) => {
        const validationResult = userSchema.validate(req.body);
        if (validationResult.error) {
            return res.status(400).json({error: validationResult.error.message})
        }
        next();
    },
};