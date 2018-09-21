const {
  GraphQLString,
  GraphQLNonNull,
} = require('graphql');
const { model: Credential } = require('../../models/credential');
const tokenType = require('../types/token');

const resolveToken = (_, { value }) =>
  Credential
    .findOne({
      'token.value': value,
    })
    .then(res => (res ? res.token : null));

module.exports = {
  token: {
    type: tokenType,
    args: {
      value: { type: new GraphQLNonNull(GraphQLString) },
    },
    resolve: resolveToken,
  },
};
