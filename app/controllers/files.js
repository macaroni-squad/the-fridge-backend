'use strict';

const controller = require('lib/wiring/controller');
const models = require('app/models');
const File = models.file;
const AWS = require('aws-sdk');
const awsS3Upload = require('../../bin/aws-upload');

const authenticate = require('./concerns/authenticate');

// multer for uploading

const multer = require('multer'); // Antony had require('./concerns/multer.js') but it crashed nodemon
const upload = multer({ storage: multer.memoryStorage() });

const index = (req, res, next) => {
  let search = {
    _owner: req.currentUser._id
  };
  File.find(search)
    .then(files => res.json({ files }))
    .catch(err => next(err));
};

const show = (req, res, next) => {
  File.findById(req.params.id)
    .then(file => file ? res.json({ file }) : next())
    .catch(err => next(err));
};

// REQUIRE AUTENTICATION
const create = (req, res, next) => {
  let file = Object.assign(req.file, {
    title: req.body.file.title,
    description: req.body.file.description,
    filename: req.file.originalname,
    // appending _owner property to file create
    _owner: req.currentUser._id,
  });
  awsS3Upload(file)
  .then(file => res.json({ file }))
  .catch(err => next(err));
  // return res.json({ body: req.body, file: req.file });
};

// REQUIRE AUTENTICATION
const update = (req, res, next) => {
  let search = { _id: req.params.id,
    _owner: req.currentUser._id
  };
  File.findOne(search)
    .then(file => {
      if (!file) {
        return next();
      }

      delete req.body._owner;  // disallow owner reassignment.
      return file.update({
        title: req.body.files.title,
        description: req.body.files.description })
        .then(() => res.sendStatus(200));
    })
    .catch(err => next(err));
};

// REQUIRE AUTENTICATION
const destroy = (req, res, next) => {
  let s3 = new AWS.S3();
  // find by current user ID and params ID
  let search = { _id: req.params.id, _owner: req.currentUser._id };
  File.findOne(search)
  // if there's no file, skip ahead
  .then(file => {
    if (!file) {
      return next();
    }
    // returns everything after '.com/' in the file URL, which
    // represents the file key on AWS
    return file.location.split('.com/').pop();
  // creates a params object
  }).then((awsKey) =>  ({
      Bucket: 'bucketimgoinghome',
      Key: awsKey,
  // passes params for delete function
  })).then((params) =>
    new Promise((resolve, reject) =>
      s3.deleteObject(params, (err, data) =>
        err ? reject(err) : resolve(data)
      )
    )
  )
  // removes the metadata about the file from the database
  .then(() => File.findOne(search).remove())
  // server responds with 200
  .then(() => res.sendStatus(200))
  .catch(err => next(err));
};

module.exports = controller({
  index,
  show,
  create,
  update,
  destroy,
}, { before: [
  { method: authenticate },
  { method: upload.single('file[file]'), only: ['create', 'update'], },
  // { method: multer.single(), except: ['index', 'show', 'destroy'], }
], });
