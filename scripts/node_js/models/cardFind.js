'use strict';

const mongoose = require('mongoose');

const cardFindSchema = mongoose.Schema({
  movingMethod: String,
  color: String,
  breed: String,
  description: String,
  email: String,
  photo: String,
  phoneNumber: String
});

module.exports = mongoose.model('CardFind', cardFindSchema);
