const express = require('express');

const router = express.Router();
const {
  createUserContr,
  loginUserContr,
  logoutUserContr,
  getCurrentUserContr,
  uploadAvatarContr,
  verifyUserContr,
  repeatedVerifyUserContr,
} = require('../../Controllers');

const {
  authUserValidateMwr,
  registerUserValidateMwr,
  authMwr,
  uploadAvatarMwr,
  repeatedVerifyMwr,
  verificationTokenValidateMwr,
} = require('../../middlewars');

router.post('/register', registerUserValidateMwr, createUserContr);
router.get('/login', authUserValidateMwr, loginUserContr);
router.post('/logout', authMwr, logoutUserContr);
router.get('/current', authMwr, getCurrentUserContr);
router.patch(
  '/avatars',
  // [authMwr, uploadAvatarMwr.single('avatar')],
  [authMwr, uploadAvatarMwr('avatar')],
  uploadAvatarContr// ! rename to saveAvatarContr...
);
router.get(
  '/verify/:verificationToken',
  verificationTokenValidateMwr,
  verifyUserContr
);
router.post('/verify', repeatedVerifyMwr, repeatedVerifyUserContr);

module.exports = router;
