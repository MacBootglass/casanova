const express = require('express');
const graphqlHTTP = require('express-graphql');
const mongoose = require('mongoose');

const schema = require('./schema');
const models = require('./models');
const {
  allowGraphiql,
  service,
  database,
} = require('./config');

// Init mongoose
const databaseUrl = `mongodb://${database.host}:${database.port}/${database.table}`;
mongoose
  .connect(databaseUrl)
  .then(() => {
    console.log(`Service ${service.name} is successfully connected to the database ${databaseUrl}`);
    models();
  })
  .catch(() => console.error(`Service ${service.name} can't reach the database ${databaseUrl}`));

// Init express server with graphql middleware
const app = express();
app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: allowGraphiql,
}));
app.listen(service.port, service.host);
console.log(`Service ${service.name} is running on http://${service.host}:${service.port}`);
