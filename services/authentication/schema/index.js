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
  }).then(credential => credential.token);

const signIn = (_, { email, password }) =>
  Credential.findOne({
    email,
    password,
  }).then(credential => {
    credential.set({ token: {} });
    return credential.save();
  }).then(credential => credential.token);

const tokenType = new GraphQLObjectType({
  name: 'Token',
  fields: {
    value: { type: GraphQLString },
    expirationDate: { type: GraphQLString },
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
      type: tokenType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      resolve: signUp,
    },
    signIn: {
      type: tokenType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      resolve: signIn,
    },
  },
});

module.exports = new GraphQLSchema({
  query: queryType,
});
