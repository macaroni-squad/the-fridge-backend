'use strict';

const multer = require('multer');
const multiPartFormData = multer({ storage: multer.memoryStorage() });

module.exports = multiPartFormData;
