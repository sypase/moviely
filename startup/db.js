const winston = require('winston');
const mongoose = require('mongoose');
module.exports = function () {
  mongoose
    .connect(`mongodb://localhost/vidly`, {})
    .then(() => winston.info('Connected to database....'));
  // .catch((err) => console.error('Connection to database failed.'));
};
