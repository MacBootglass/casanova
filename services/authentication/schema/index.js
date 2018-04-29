const mongoose = require('mongoose');
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
} = require('graphql');

const CredentialModel = mongoose.model('Credential');

const resolveToken = (_, { value }) => new Promise((resolve, reject) =>
  CredentialModel.findOne({ token: { value } }).then(resolve).catch(reject));

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
  },
});

module.exports = new GraphQLSchema({
  query: queryType,
});
