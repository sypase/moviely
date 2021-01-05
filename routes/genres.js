const express = require('express');
const debug = require('debug')('app:request');
const debuge = require('debug')('app:extracheck');
const mongoose = require('mongoose');
const { Genre, validate } = require('../models/genre');
const router = express.Router();
///////////////////////////////////////////////////////////////////////////////
router.get('/', async (req, res) => {
  const genre = await Genre.find().sort('name');
  res.send(genre);
});
router.get('/:id', async (req, res) => {
  const genre = await Genre.findById(req.params.id);
  if (!genre)
    return res.status(404).send('The genre with the given Id was not found.');
  res.send(genre);
});
/////////////////////////////////////////////////////
router.post('/', async (req, res) => {
  const { error } = validate(req.body);
//   debug(error);
//   debuge(error.details);
//   debug(error.details[1]);
  if (error) return res.status(400).send(error.details[0].message);
  let genre = new Genre({
    name: req.body.name,
  });
  genre = await genre.save();
  res.send(genre);
});
/////////////////////////////////////////////////////
router.put('/:id', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const genre = await Genre.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
    },
    {
      new: true,
    }
  );
  if (!genre)
    return res.status(404).send('The genre wth the gicen id was not found');
  res.send(genre);
});
//////////////////////////////////////////////////
router.delete('/:id', async (req, res) => {
  const genre = await Genre.findByIdAndRemove(req.params.id);
  if (!genre)
    return res.status(404).send('The genre with the given id was not found');
  res.send(genre);
});
module.exports = router;
