const { model: Credential } = require('../../models/credential');
const tokenType = require('../types/token');
const credentialInput = require('../inputs/credential');

const signOut = (_, { email, password }) =>
  Credential
    .findOne({
      email,
      password,
    })
    .then((credential) => {
      const token = { expirationDate: new Date() };
      credential.set({ token });
      return credential.save();
    })
    .then(credential => (credential ? credential.token : null));

module.exports = {
  signOut: {
    type: tokenType,
    args: credentialInput,
    resolve: signOut,
  },
};
