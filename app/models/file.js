'use strict';

const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  fileType: {
    type: String,
    // required: true
  },
  location: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true,
    // validates: {
    //   validator: function(string) {
    //     return string.length <= 200;
    //   },
    //   message: 'Description cannot be longer than 200 characters.'
    // }
  },
  folder: {
    type: String,
    required: true
  },
  _owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true // by default has createdAt and updatedAt
});

const File = mongoose.model('File', fileSchema);

module.exports = File;
