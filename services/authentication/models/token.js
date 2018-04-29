const mongoose = require('mongoose');
const dayjs = require('dayjs');
const uuid = require('uuid/v4');
const { tokenLifeTime } = require('../config');

module.exports = mongoose.Schema({
  value: {
    type: String,
    default: uuid(),
  },
  expirationDate: {
    type: String,
    default: dayjs().add(tokenLifeTime, 'hour'),
  }
});
