const Joi = require('joi');

const {name, email, phone} = require('./joiTemplates')

const schemaPost = Joi.object().keys({
    name: name.required(),
    email: email.required(),
    phone: phone.required(),
});

const schemaUpdate = Joi.object().keys({
    name: name.optional(),
    email: email.optional(),
    phone: phone.optional(),
});

const schemaFaforite = Joi.object({
    favorite: Joi.boolean()
        .required(),
});


module.exports = {
    addPostValidateMwr: (req, res, next) => {
        const validationResult = schemaPost.validate(req.body);
        if (validationResult.error) {
            return res.status(400).json({error: validationResult.error.details[0].message})
        }
        next();
    },
    updatePostValidateMwr: (req, res, next) => {
        const validationResult = schemaUpdate.validate(req.body);
        if (validationResult.error) {
            return res.status(400).json({error: validationResult.error.details[0].message})
        }
        next();
    },
    updateFavoriteValidateMwr: (req, res, next) => {
        const validationResult = schemaFaforite.validate(req.body);
        if (validationResult.error) {
            return res.status(400).json({error: validationResult.error.details[0].message})
        }
        next();
    }
};
