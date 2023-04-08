const { authMwr } = require('./authMwr');
const {
  addContactValidateMwr,
  updateContactValidateMwr,
  updateFavoriteValidateMwr,
  checkContactIdMwr,
} = require('./contactsValitationMwr');
const { uploadAvatarMwr } = require('./uploadAvatarMwr');
const { authUserValidateMwr, registerUserValidateMwr } = require('./usersValidationMwr');
const { repeatedVerifyMwr } = require('./repeatedVerifyMwr');
const {
  verificationTokenValidateMwr,
} = require('./verificationTokenValidateMwr');

module.exports = {
  authMwr,
  addContactValidateMwr,
  updateContactValidateMwr,
  updateFavoriteValidateMwr,
  uploadAvatarMwr,
  authUserValidateMwr,
  registerUserValidateMwr,
  repeatedVerifyMwr,
  verificationTokenValidateMwr,
  checkContactIdMwr,
};
