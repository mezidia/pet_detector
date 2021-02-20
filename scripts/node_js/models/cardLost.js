'use strict';

const mongoose = require('mongoose');

const lost = mongoose.Schema({
  date: String,
  color: String,
  animal: String,
  breed: String,
  age: Number,
  photo: String,
  description: String,
  email: String,
  phoneNumber: String
});

module.exports = mongoose.model('lost', lost);
