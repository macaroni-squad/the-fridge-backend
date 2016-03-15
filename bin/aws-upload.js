'use strict';

require('dotenv').load();

// const fs = require('fs');
// const fileType = require('file-type');
// const mongoose = require('../app/middleware/mongoose.js');
const awsUpload = require('../lib/aws-upload');
const File = require('../app/models/file.js');

let awsS3Upload = function(fileToUpload){
  return new Promise((resolve, reject) => {
    let result = awsUpload(fileToUpload);
    result ? resolve(result) : reject(result);
  }).then((awsS3Response) => {
    return File.create({ location: awsS3Response.Location,
        title: fileToUpload.title,
        description: fileToUpload.description,
        _owner: fileToUpload._owner
      });
  }).then((file) => { // model instance created and saved
    console.log('Success!');
    console.log(file);
  }).catch(console.error);
};

module.exports = awsS3Upload;
