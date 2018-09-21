// Configure environment (set logger as global)
const env = require('./config/env');
const logger = require('../../shared/logger');

global.logger = logger(env.service.name);

// Start the service
const startMongoose = require('./config/mongoose');
const startExpress = require('./config/express');

startMongoose();
startExpress();
