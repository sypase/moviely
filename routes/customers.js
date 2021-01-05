const { Customer, validate } = require('../models/customer');
const debug = require('debug')('app:request');
const debuge = require('debug')('app:extracheck');
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

router.get('/', async (req, res) => {
  const customers = await Customer.find().sort('name');
  res.send(customers);
});

router.post('/', async (req, res) => {
  //   debug(req.body);
  const { error } = validate(req.body);
  //   debuge(error);
  //   debug(error.details);
  if (error) return res.status(400).send(error.details[0].message);
  let customer = new Customer({
    name: req.body.name,
    phone: req.body.phone,
    isGold: req.body.isGold,
  });
  customer = await customer.save();
  debug(customer);
  res.send(customer);
});
//////////////////////////////////

router.put('/:id', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0]);
  const customer = await Customer.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      isGold: req.body.isGold,
      phone: req.body.phone,
    },
    { new: true }
  );
  if (!customer)
    return res
      .status(404)
      .send('The customer with the given ID was not found.');
  res.send(customer);
});
//////////////////////////////////
router.delete('/:id', async (req, res) => {
  debug('here');
  const customer = await Customer.findByIdAndDelete(req.params.id);
  if (!customer) return res.status(404).send('Id Not found.');
  debug(customer);
  res.send(customer);
});
/////////////////////////////////Get By id
router.get('/:id', async (req, res) => {
  const customer = await Customer.findById(req.params.id);
  if (!customer) return res.status(404).send('requested Id Not Found');
  res.send(customer);
});
/////////////////////////////////
module.exports = router;
