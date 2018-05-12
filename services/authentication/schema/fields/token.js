const { GraphQLString } = require('graphql');
const { model: Credential } = require('../../models/credential');
const tokenType = require('../types/token');

const resolveToken = (_, { value }) =>
  Credential.findOne({
    'token.value': value,
  }).then(res => res.token);

module.exports = {
  token: {
    type: tokenType,
    args: {
      value: { type: GraphQLString }
    },
    resolve: resolveToken,
  },
};
