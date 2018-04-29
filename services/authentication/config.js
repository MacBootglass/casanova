const ENV = process.env;
module.exports = {
  service: {
    name: ENV.AUTHENTICATION_SERVICE_NAME || 'authentication',
    host: ENV.AUTHENTICATION_SERVICE_HOST || 'localhost',
    port: ENV.AUTHENTICATION_SERVICE_PORT || 4000,
  },
  database: {
    host: ENV.AUTHENTICATION_DATABASE_HOST || 'localhost',
    port: ENV.AUTHENTICATION_DATABASE_HOST || 27017,
    table: ENV.AUTHENTICATION_DATABASE_TABLE || 'authentication',
  },
  allowGraphiql: ENV.AUTHENTICATION_GRAPHIQL || true,
};
