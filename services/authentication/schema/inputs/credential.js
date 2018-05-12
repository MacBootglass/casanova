const {
  GraphQLNonNull,
  GraphQLString,
} = require('graphql');

module.exports = {
  email: {
    type: new GraphQLNonNull(GraphQLString)
  },
  password: {
    type: new GraphQLNonNull(GraphQLString)
  },
};
