const { GraphQLString } = require('graphql');
const { model: Credential } = require('../../models/credential');
const tokenType = require('../types/token');

const signUp = (_, { email, password }) =>
  Credential.create({
    email,
    password,
  }).then(credential => credential.token);

module.exports = {
  signUp: {
    type: tokenType,
    args: {
      email: { type: GraphQLString },
      password: { type: GraphQLString },
    },
    resolve: signUp,
  },
};
