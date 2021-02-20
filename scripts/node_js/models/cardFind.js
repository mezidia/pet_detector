'use strict';

const mongoose = require('mongoose');

const found = mongoose.Schema({
  date: String,
  color: String,
  animal: String,
  age: String,
  breed: String,
  description: String,
  email: String,
  photo: String,
  phoneNumber: String
});

module.exports = mongoose.model('found', found);
