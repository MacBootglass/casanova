const {
  GraphQLObjectType,
  GraphQLString,
} = require('graphql');

module.exports = new GraphQLObjectType({
  name: 'Token',
  fields: {
    value: { type: GraphQLString },
    expirationDate: { type: GraphQLString },
  },
});
