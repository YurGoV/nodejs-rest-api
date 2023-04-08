const Joi = require('joi');
const {
  Types: { ObjectId },
} = require('mongoose');

const { name, email, phone } = require('./joiTemplates');
const { CustomError } = require('../utils');

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

const schemaFavorite = Joi.object({
  favorite: Joi.boolean().required(),
});

module.exports = {
  addContactValidateMwr: (req, res, next) => {
    const validationResult = schemaPost.validate(req.body);
    if (validationResult.error) {
      return res
        .status(400)
        .json({ error: validationResult.error.details[0].message });
    }
    next();
  },
  updateContactValidateMwr: (req, res, next) => {
    const validationResult = schemaUpdate.validate(req.body);
    if (validationResult.error) {
      return res
        .status(400)
        .json({ error: validationResult.error.details[0].message });
    }
    next();
  },
  updateFavoriteValidateMwr: (req, res, next) => {
    const validationResult = schemaFavorite.validate(req.body);
    if (validationResult.error) {
      return res
        .status(400)
        .json({ error: validationResult.error.details[0].message });
    }
    next();
  },
  checkContactIdMwr: (req, res, next) => {
    try {
      const { contactId } = req.params;

      if (!ObjectId.isValid(contactId)) {
        // перевірка, чи валідний ID

        return next(new CustomError(400, 'Invalid user id!')); // TODO: split to prod/dev errors
      }

      next();
    } catch (err) {
      next(err);
    }
  },
};
