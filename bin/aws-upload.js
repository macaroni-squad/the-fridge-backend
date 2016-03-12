'use strict';

require('dotenv').load();

const fs = require('fs');
const fileType = require('file-type');
const mongoose = require('../app/middleware/mongoose.js');
const awsUpload = require('../lib/aws-upload');
const File = require('../app/models/file.js');

let filename = process.argv[2];
let comment = process.argv[3] || '';

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
.then((awsS3Response) =>
  File.create({ location: awsS3Response.Location, comment })
).then((file) => { // model instance created and saved
  console.log('Success!');
  console.log(file);
}).catch(console.error)
.then(() => mongoose.connection.close());
