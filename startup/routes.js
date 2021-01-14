const express = require('express');
const customer = require('../routes/customers');
const genre = require('../routes/genres');
const movie = require('../routes/movies');
const rental = require('../routes/rentals');
const user = require('../routes/users');
const auth = require('../routes/auth');
const error = require('../middleware/error');
module.exports = function (app) {
  app.use(express.json());
  app.use('/api/customers', customer);
  app.use('/api/genres', genre);
  app.use('/api/movies', movie);
  app.use('/api/rentals', rental);
  app.use('/api/users', user);
  app.use('/api/auth', auth);
  app.use(error);
};
