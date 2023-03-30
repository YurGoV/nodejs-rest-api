const express = require('express');
const router = new express.Router();
const path = require('path');
require('dotenv').config();

const FILE_DIR_ENV = process.env.FILE_DIR_ENV;
const FILE_DIR =  path.resolve(FILE_DIR_ENV);

router.use('/', express.static(FILE_DIR));

module.exports = router;
