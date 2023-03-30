const Joi = require('joi');
const {verificationToken} = require('./joiTemplates')

const userSchema = Joi.object().keys({
    verificationToken: verificationToken.required(),
    }
);

module.exports = {
    verificationTokenValidateMwr: (req, res, next) => {
        const validationResult = userSchema.validate(req.params);
        if (validationResult.error) {
            return res.status(400).json({error: validationResult.error.message})
        }
        next();
    },
};