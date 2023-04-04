const Joi = require('joi');
const { CustomError } = require('../utils');
const { email, password } = require('./joiTemplates');
const { User } = require('../db/usersModel');

const userSchema = Joi.object().keys({
  email: email.required(),
  password: password.required(),
});

const authUserValidateMwr = (req, res, next) => {
  const validationResult = userSchema.validate(req.body);
  if (validationResult.error) {
    return res.status(400).json({ error: validationResult.error.message });
  }
  next();
};

const registerUserValidateMwr = async (req, res, next) => {
  const { error, value } = userSchema.validate(req.body);
  if (error) {
    // return new CustomError(400, error.message );
    return res.status(400).json({ error: error.message });
  }
  const { email: emailToCheck } = value;
  const userExists = await User.exists({ email: emailToCheck }); // повертає айді, якщо такий юзер вже є
  // console.log('CL: ~ file: usersValidationMwr.js:28 ~ userExists:', userExists);

  if (userExists) return next(new CustomError(409, 'email is already used')); // todo: uncommit

  next();
};

module.exports = {
  authUserValidateMwr,
  registerUserValidateMwr,
};
