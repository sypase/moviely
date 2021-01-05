const mongoose = require('mongoose');

const express = require('express');
const customer = require('./routes/customers');
const genre = require('./routes/genres');
const movie = require('./routes/movies');

const app = express();
mongoose
  .connect(`mongodb://localhost/vidly`)
  .then(() => console.log('Connected to database....'))
  .catch((err) => console.error('Connection to database failed.'));

app.use(express.json());
app.use('/api/customers', customer);
app.use('/api/genres', genre);
app.use('/api/movies', movie);
const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on Port ${port}`));
