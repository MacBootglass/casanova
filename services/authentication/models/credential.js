const mongoose = require('mongoose');
const token = require('./token');

module.exports = mongoose.Schema({
  email: {
    type: String,
    index: {
      unique: true,
    },
    set: email => email.trim().toLowerCase(),
  },
  password: String,
  token,
});
