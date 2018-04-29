const mongoose = require('mongoose');
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
} = require('graphql');

const CredentialModel = mongoose.model('Credential');

const resolveToken = (_, { value }) => new Promise((resolve, reject) =>
  CredentialModel.findOne({ token: { value } }).then(resolve).catch(reject));

const signUp = (_, { email, password }) => new Promise((resolve, reject) =>
  CredentialModel.create({
    email,
    password,
  }).then(resolve).catch((reject)));

const tokenType = new GraphQLObjectType({
  name: 'Token',
  fields: {
    value: { type: GraphQLString },
    expirationDate: { type: GraphQLString },
  },
});

const credentialType = new GraphQLObjectType({
  name: 'Credential',
  fields: {
    email: { type: GraphQLString },
    token: { type: tokenType },
  },
});

const queryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    token: {
      type: tokenType,
      args: {
        value: { type: GraphQLString }
      },
      resolve: resolveToken,
    },
    signUp: {
      type: credentialType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      resolve: signUp,
    }
  },
});

module.exports = new GraphQLSchema({
  query: queryType,
});
