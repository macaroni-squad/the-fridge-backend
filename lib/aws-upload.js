'use strict';

const AWS = require('aws-sdk');
const crypto = require('crypto');

const randomString = () =>
  new Promise((resolve, reject) =>
    crypto.randomBytes(16, (err, data) =>
    err ? reject(err) : resolve(data.toString('hex'))
  )
);

const awsUpload = (file) => {
  let directory = new Date().toISOString().split('T')[0];
  let s3 = new AWS.S3();

  return randomString().then((randomHexString) => ({
    ACL: 'public-read',
    Body: file.data,
    Bucket: 'jwexpress', // should probably create new bucket? Also need secrets?
    ContentType: file.type.mime,
    Key: `${directory}/${randomHexString}.${file.type.ext}`,
  })).then((params) =>
    new Promise((resolve, reject) =>
      s3.upload(params, (err, data) =>
        err ? reject(err) : resolve(data)
      )
    )
  );
};

module.exports = awsUpload;
