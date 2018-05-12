const mongoose = require('mongoose');
const dayjs = require('dayjs');
const uuid = require('uuid/v4');
const { tokenLifeTime } = require('../config/env');

const _exports = () => ({
  schema: token,
});

const token = mongoose.Schema({
  value: {
    type: String,
    default: uuid(),
  },
  expirationDate: {
    type: String,
    default: dayjs().add(tokenLifeTime, 'hour'),
  }
});

module.exports = _exports();
