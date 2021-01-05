const mongoose = require('mongoose');
const express = require('express');
const Joi = require('joi');
const app = express.Router();
app.get('/', (req, res) => {
  res.send('HomePage');
});

module.exports = app;
