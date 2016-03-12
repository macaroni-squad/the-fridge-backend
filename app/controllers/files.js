'use strict';

const controller = require('lib/wiring/controller');
const models = require('app/models');
const File = models.file;

const authenticate = require('./concerns/authenticate');

// multer for uploading
const multer = require('./concerns/multer');
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
    _owner: req.currentUser._id,
  });
  File.create(file)
    .then(file => res.json({ file }))
    .catch(err => next(err));
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
  let search = { _id: req.params.id, _owner: req.currentUser._id };
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
  { method: authenticate, except: ['index', 'show'] },
  { method: upload.single('file[file]'), only: ['create'], },
  { method: multer.single(), except: ['index', 'show', 'destroy'], }
], });
