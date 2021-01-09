const _ = require('lodash');
const { User, validate } = require('../models/user');
const mongoose = require('mongoose');
const express = require('express');
const debug = require('debug')('app:request');
const debuge = require('debug')('app:extracheck');
const router = express.Router();

router.post('/', async (req, res) => {
  debug('here');
  const { error } = validate(req.body);
  console.log(error);
  if (error) return res.status(400).send(error.details[0].message);
  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send('User already Registered..');

  user = new User(_.pick(req.body, ['name', 'email', 'password']));
  await user.save();
  res.send(_.pick(user, ['_id', 'name', 'email']));
});

module.exports = router;
