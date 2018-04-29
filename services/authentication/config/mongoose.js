const mongoose = require('mongoose');
const models = require('../models');
const {
  service,
  database,
} = require('./env');

module.exports = () => {
  const databaseUrl = `mongodb://${database.host}:${database.port}/${database.table}`;
  return mongoose
    .connect(databaseUrl)
    .then(() => console.log(`Service ${service.name} is successfully connected to the database ${databaseUrl}`))
    .then(models)
    .catch(() => console.error(`Service ${service.name} can't reach the database ${databaseUrl}`));
};
