const mongoose = require('mongoose');
const { schema: token } = require('./token');

const _exports = () => ({
  model: mongoose.model('Credential', credential),
  schema: credential,
});

const credential = mongoose.Schema({
  email: {
    type: String,
    index: {
      unique: true,
    },
    required: true,
    set: email => email.trim().toLowerCase(),
  },
  password: {
    type: String,
    required: true,
  },
  token: {
    type: token,
  },
});

module.exports = _exports();
