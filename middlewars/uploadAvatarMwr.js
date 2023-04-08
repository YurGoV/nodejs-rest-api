const multer = require('multer');
require('dotenv').config();
const { CustomError } = require('../utils');

const limits = { fileSize: 4194304 };

const uploadAvatarMwr = (name) => {
  const multerStorage = multer.memoryStorage();

  const multerFileFilter = (req, file, clb) => {
    if (file.mimetype.startsWith('image')) {
      clb(null, true);
    } else {
      clb(new CustomError(400, 'Please upload image file only'), false);
    }
  };

  return multer({
    storage: multerStorage,
    fileFilter: multerFileFilter,
    limits,
  }).single(name);
};

module.exports = {
  uploadAvatarMwr,
};
