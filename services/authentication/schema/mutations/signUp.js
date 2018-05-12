const { model: Credential } = require('../../models/credential');
const tokenType = require('../types/token');
const credentialInput = require('../inputs/credential');

const signUp = (_, { email, password }) =>
  Credential.create({
    email,
    password,
  }).then(credential => credential ? credential.token : null);

module.exports = {
  signUp: {
    type: tokenType,
    args: credentialInput,
    resolve: signUp,
  },
};
