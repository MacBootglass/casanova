const signUp = require('./signUp');
const signIn = require('./signIn');
const signOut = require('./signOut');

module.exports = Object.assign(
  {},
  signUp,
  signIn,
  signOut,
);
