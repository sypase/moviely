const { Genre } = require('../models/genre');
const { Movie, validate } = require('../models/movie');
const debug = require('debug')('app:request');
const debuge = require('debug')('app:extracheck');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const genre = await Movie.find().sort('name');
  res.send(genre);
});
router.post('/', async (req, res) => {
  debug('here1');
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  debuge('here2');
  const genre = await Genre.findById(req.body.genreId);
  if (!genre) return res.status(404).send('Invalid Genre.');
  const movie = new Movie({
    title: req.body.title,
    genre: {
      _id: genre._id,
      name: genre.name,
    },
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate,
  });
  await movie.save();
  res.send(movie);
});
///PUT,DELETE,GET BAKI
router.put('/:id', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const genre = await Genre.findById(req.body.genreId);
  if (!genre) return res.status(400).send('Invalid Genre.');
  const movie = await Movie.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      genre: {
        _id: genre._id,
        name: genre.name,
      },
      numberInStock: req.body.numberInStock,
      dailyRentalRate: req.body.dailyRentalRate,
    },
    {
      new: true,
    }
  );
  if (!movie) return res.status(400).send('Tnvalid Movie Id');
  res.send(movie);
});

router.delete('/:id', async (req, res) => {
  const movie = await Movie.findByIdAndRemove(req.params.id);
  if (!movie)
    return res.status(404).send('The movie with the given ID was not found.');

  res.send(movie);
});
router.get('/:id', async (req, res) => {
  const movie = await Movie.findById(req.params.id);
  if (!movie)
    return res.status(404).send('The movie with the given ID was not found.');

  res.send(movie);
});

module.exports = router;
