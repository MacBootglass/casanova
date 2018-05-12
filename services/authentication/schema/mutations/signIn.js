const { GraphQLString } = require('graphql');
const { model: Credential } = require('../../models/credential');
const tokenType = require('../types/token');

const signIn = (_, { email, password }) =>
  Credential.findOne({
    email,
    password,
  }).then(credential => {
    credential.set({ token: {} });
    return credential.save();
  }).then(credential => credential.token);

module.exports = {
  signIn: {
    type: tokenType,
    args: {
      email: { type: GraphQLString },
      password: { type: GraphQLString },
    },
    resolve: signIn,
  },
};
