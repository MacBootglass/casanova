const {
  GraphQLSchema,
  GraphQLObjectType,
} = require('graphql');

const mutations = require('./mutations');
const fields = require('./fields');

const queryType = new GraphQLObjectType({
  name: 'Query',
  fields: Object.assign({}, mutations, fields),
});

module.exports = new GraphQLSchema({
  query: queryType,
});
