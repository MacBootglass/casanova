const { model: Credential } = require('../../models/credential');
const tokenType = require('../types/token');
const credentialInput = require('../inputs/credential');

const signIn = (_, { email, password }) =>
  Credential
    .findOne({
      email,
      password,
    })
    .then((credential) => {
      const token = {};
      credential.set({ token });
      return credential.save();
    })
    .then(credential => (credential ? credential.token : null));

module.exports = {
  signIn: {
    type: tokenType,
    args: credentialInput,
    resolve: signIn,
  },
};
