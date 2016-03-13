'use strict';

require('dotenv').load();

const fs = require('fs');
const fileType = require('file-type');
const mongoose = require('../app/middleware/mongoose.js');
const awsUpload = require('../lib/aws-upload');
const File = require('../app/models/file.js');

let filename = process.argv[2];
let title = process.argv[3];
let description = process.argv[4];

new Promise((resolve, reject) =>
  fs.readFile(filename, (err, data) =>
    err ? reject(err) : resolve(data)
  )
).then((data) => {
  let file = { data };
  file.type = fileType(data) || {
    ext: 'bin',
    mime: 'application/octet-stream',
  };
  return file;
}).then(awsUpload)
.then((awsS3Response) => {
  console.log("IM IN THIS BITCH!!!!");
  console.log(awsS3Response);
  return File.create({ location: awsS3Response.Location, title, description });
}).then((file) => { // model instance created and saved
  console.log('Success!');
  console.log(file);
}).catch(console.error)
.then(() => mongoose.connection.close());
