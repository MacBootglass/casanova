const { GraphQLString } = require('graphql');
const { model: Credential } = require('../../models/credential');
const tokenType = require('../types/token');

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
    args: {
      email: { type: GraphQLString },
      password: { type: GraphQLString },
    },
    resolve: signOut,
  },
};
