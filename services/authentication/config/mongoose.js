const mongoose = require('mongoose');
const models = require('../models');
const {
  service,
  database,
} = require('./env');

const DATABASE_URL = `mongodb://${database.host}:${database.port}/${database.table}`;

module.exports = () =>
  mongoose
    .connect(DATABASE_URL)
    .then(() => logger.info(`Service ${service.name} is successfully connected to the database ${DATABASE_URL}`))
    .then(models)
    .catch(() => logger.error(`Service ${service.name} can't reach the database ${DATABASE_URL}`));
