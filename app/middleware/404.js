'use strict';

const notFound = (request, response, next) => {
  var error = new Error('Not Found');
  error.status = 404;
  next(error);
};

module.exports = notFound;
