const fse = require('fs-extra');
const sharp = require('sharp');
const { v4: uuid } = require('uuid');
const path = require('path');
require('dotenv').config();

const { CustomError } = require('../utils');

const { PORT, FILE_DIR_ENV, AVATAR_SUBDIR_ENV } = process.env;
const AVATAR_DIR = path.resolve(FILE_DIR_ENV, AVATAR_SUBDIR_ENV);

const avatarSize = { height: 500, width: 500 };

const {
  registerUserServ,
  findValidUserServ,
  verifyUserServ,
  sendVerifyMailServ,
} = require('../Services');
const { User } = require('../db/usersModel');
const { catchAsyncWrapper } = require('../utils');

const createUserContr = catchAsyncWrapper(async (req, res) => {
  const userData = req.body;

  const createdUser = await registerUserServ(userData);

  res.status(201).json({
    user: {
      email: `${createdUser.email}`,
      subscription: `${createdUser.subscription}`,
    },
  });
});

const loginUserContr = catchAsyncWrapper(async (req, res, next) => {
  const { email, password } = req.body;

  const searchUserResult = await findValidUserServ(email, password);

  if (!searchUserResult) {
    // todo:  move to service
    // return res.status(401).json({
    //   message: 'Email or password is wrong',
    // });// todo: !!! video pause there
    return next(new CustomError(401, 'Email or password is wrong'));
  }
  if (searchUserResult.user.verify) {
    return res.status(200).json(searchUserResult);
  }
  // todo: error handle check
  /* return res.status(401).json({
    message: 'Please verify you email',
  }); */

  return next(new CustomError(401, 'Please verify you email'));
  // todo: error handle check
});

const logoutUserContr = catchAsyncWrapper(async (req, res) => {
  await User.findOneAndUpdate({ email: req.user }, { token: '' });

  return res.status(204).json({});
});

const getCurrentUserContr = (req, res, next) => {
  try {
    const { user, subscription } = req;

    return res.status(200).json({
      email: user,
      subscription,
    });
  } catch (err) {
    // res.status(500).json(err.message);
    next(err);
  }
};

const uploadAvatarContr = catchAsyncWrapper(async (req, res, next) => {
  const { user, file } = req; // *multer закидає файл у реквест, тому беремо його з реквесту

  if (!file) {
    return next(CustomError(400, 'avatar file not found')); // ! check syntaxes
  }

  const fileRandomName = `${uuid()}.jpeg`;
  const userAvatarFolder = req.userId.toString();
  const fullFilePath = path.join(AVATAR_DIR, userAvatarFolder);

  await fse.ensureDir(fullFilePath);

  await sharp(file.buffer)
    .resize(avatarSize)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(path.join(fullFilePath, fileRandomName));

  const avatarDownloadUrl = `http://localhost:${PORT}/files/${AVATAR_SUBDIR_ENV}/${userAvatarFolder}/${fileRandomName}`;

  await User.findOneAndUpdate(
    { email: user },
    { avatarURL: avatarDownloadUrl }
  );

  return res.status(200).json({
    avatarURL: avatarDownloadUrl,
  });
});

const verifyUserContr = catchAsyncWrapper(async (req, res) => {
  const { verificationToken } = req.params;

  const verifyTokenResult = await verifyUserServ(verificationToken);
  if (verifyTokenResult.statusCode === 200) {
    // todo:  move to service
    return res.status(200).json({
      message: 'Verification successful',
    });
  }
  if (verifyTokenResult.statusCode === 404) {
    return res.status(404).json({
      message: 'User not found',
    });
  }

  res.status(500).json({ message: 'test' });
});

const repeatedVerifyUserContr = catchAsyncWrapper(async (req, res) => {
  const { email } = req.body;

  const repeatedMailSend = await sendVerifyMailServ(email);

  if (repeatedMailSend.statusCode === 404) {
    // todo:  move to service
    return res.status(404).json({
      message: 'User not found',
    });
  }
  if (repeatedMailSend.statusCode === 400) {
    return res.status(400).json({
      message: 'Verification has already been passed',
    });
  }
  if (repeatedMailSend.statusCode === 200) {
    return res.status(200).json({
      message: 'Verification email sent',
    });
  }
});

module.exports = {
  createUserContr,
  loginUserContr,
  logoutUserContr,
  getCurrentUserContr,
  uploadAvatarContr,
  verifyUserContr,
  repeatedVerifyUserContr,
};
