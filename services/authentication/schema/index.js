const { model: Credential } = require('../models/credential');
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
} = require('graphql');

const resolveToken = (_, { value }) =>
  Credential.findOne({
    token: { value }
  });

const signUp = (_, { email, password }) =>
  Credential.create({
    email,
    password,
  });

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
