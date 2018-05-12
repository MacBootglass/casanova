const mongoose = require('mongoose');
const dayjs = require('dayjs');
const uuid = require('uuid/v4');
const { tokenLifeTime } = require('../config/env');

const _exports = () => ({
  schema: token,
  model: mongoose.model('Token', token),
});

const token = new mongoose.Schema({
  value: {
    type: String,
    default: () => uuid(),
  },
  expirationDate: {
    type: Date,
    default: () => dayjs().add(tokenLifeTime, 'hour').toDate(),
  }
});

module.exports = _exports();
