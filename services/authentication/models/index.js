const mongoose = require('mongoose');
const credential = require('./credential');

module.exports = () => {
  mongoose.model('Credential', credential);
};
