const { model: Credential } = require('../../models/credential');
const tokenType = require('../types/token');
const credentialInput = require('../inputs/credential');

const signOut = (_, { email, password }) =>
  Credential.findOne({
    email,
    password,
  }).then(credential => {
    credential.set({ token: { expirationDate: new Date() } });
    return credential.save();
  }).then(credential => credential.token);

module.exports = {
  signOut: {
    type: tokenType,
    args: credentialInput,
    resolve: signOut,
  },
};
