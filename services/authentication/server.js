const mongooseConf = require('./config/mongoose');
const expressConf = require('./config/express');

mongooseConf().then(expressConf);
