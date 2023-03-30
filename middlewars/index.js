const {authMwr} = require('./authMwr');
const {
    addPostValidateMwr,
    updatePostValidateMwr,
    updateFavoriteValidateMwr,
} = require('./postsValitationMwr');
const {uploadAvatarMwr} = require('./uploadAvatarMwr');
const {authUserValidateMwr} = require('./usersValidationMwr');
const {repeatedVerifyMwr} = require('./repeatedVerifyMwr');
const {verificationTokenValidateMwr} = require('./verificationTokenValidateMwr')

module.exports = {
    authMwr,
    addPostValidateMwr,
    updatePostValidateMwr,
    updateFavoriteValidateMwr,
    uploadAvatarMwr,
    authUserValidateMwr,
    repeatedVerifyMwr,
    verificationTokenValidateMwr,
}