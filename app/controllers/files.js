'use strict';

const controller = require('lib/wiring/controller');
const models = require('app/models');
const File = models.file;
const awsS3Upload = require('../../bin/aws-upload');

const authenticate = require('./concerns/authenticate');

// multer for uploading
const multer = require('multer'); // Antony had require('./concerns/multer.js') but it crashed nodemon
const upload = multer({ storage: multer.memoryStorage() });

const index = (req, res, next) => {
  File.find()
    .then(files => res.json({ files }))
    .catch(err => next(err));
};

const show = (req, res, next) => {
  File.findById(req.params.id)
    .then(file => file ? res.json({ file }) : next())
    .catch(err => next(err));
};

const create = (req, res, next) => {
  let file = Object.assign(req.body.file, { // do we need something different for images?
    //
    title: req.body.file.title,
    description: req.body.file.description,
    filename: req.file.originalname,
    // filename: "test",
    // fileType: req.body.fileType, // added to set the fileType, location, desc on creation
  });
  console.log(file);
awsS3Upload(file.filename, file.title, file.description)
    .then(file => res.json({ file }))
    .catch(err => next(err));
  // res.json({ body: req.body, file: req.file });

};

const update = (req, res, next) => {
  let search = { _id: req.params.id, _owner: req.currentUser._id };
  File.findOne(search)
    .then(file => {
      if (!file) {
        return next();
      }

      delete req.body._owner;  // disallow owner reassignment.
      return file.update(req.body.file)
        .then(() => res.sendStatus(200));
    })
    .catch(err => next(err));
};

const destroy = (req, res, next) => {
  let search = {
    _id: req.params.id,
    _owner: req.currentUser._id };
  File.findOne(search)
    .then(file => {
      if (!file) {
        return next();
      }

      return file.remove()
        .then(() => res.sendStatus(200));
    })
    .catch(err => next(err));
};

module.exports = controller({
  index,
  show,
  create,
  update,
  destroy,
}, { before: [
  // { method: authenticate, except: ['index', 'show'] },
  { method: upload.single('file[file]'), only: ['create'], },
  // { method: multer.single(), except: ['index', 'show', 'destroy'], } // Antony also added this, but crashed nodemon
], });
