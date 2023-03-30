const multer = require('multer');
const {v4: uuid} = require('uuid');
require('dotenv').config();
const path = require('path');

const AVATAR_TEMP_DIR_ENV = process.env.AVATAR_TEMP_DIR_ENV;
const AVATAR_TEMP_DIR = path.resolve(AVATAR_TEMP_DIR_ENV);


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, AVATAR_TEMP_DIR)
    },
    filename: (req, file, cb) => {
        const [filename, extension] = file.originalname.split('.');
        const uniqueFileName = `${filename}_${uuid()}.${extension}`;
        req.uniqueFileName = uniqueFileName;
        cb(null, `${uniqueFileName}`)
    }
});

const uploadAvatarMwr = multer({storage});

module.exports = {
    uploadAvatarMwr
}