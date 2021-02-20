'use strict';

const mongoose = require('mongoose');

const cardLostSchema = mongoose.Schema({
  name: String,
  movingMethod: String,
  color: String,
  breed: String,
  age: Number,
  photo: String,
  description: String,
  email: String,
  phoneNumber: String
});

module.exports = mongoose.model('CardLost', cardLostSchema);
