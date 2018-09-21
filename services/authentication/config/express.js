const express = require('express');
const graphqlHTTP = require('express-graphql');
const {
  allowGraphiql,
  service,
} = require('./env');

module.exports = () => {
  const schema = require('../schema'); // eslint-disable-line global-require
  const graphqlEndpoint = '/graphql';
  const app = express();

  app.use(graphqlEndpoint, graphqlHTTP({
    schema,
    graphiql: allowGraphiql,
  }));
  app.listen(service.port, service.host);

  if (allowGraphiql) {
    logger.info(`Service ${service.name} with GraphQL API is running on http://${service.host}:${service.port}${graphqlEndpoint}`);
  } else {
    logger.info(`Service ${service.name} is running on http://${service.host}:${service.port}`);
  }
};
