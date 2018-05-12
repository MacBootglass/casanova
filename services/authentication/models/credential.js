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
    set: email => email.trim().toLowerCase(),
  },
  password: String,
  token: {
    type: token,
  },
});

module.exports = _exports();
