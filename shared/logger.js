const { format, transports, createLogger } = require('winston');

const isProdEnv = process.env.NODE_ENV === 'production';

const formatMessage = info =>
  `${info.timestamp} [${info.label}] ${info.level}: ${info.message}`;

const level = isProdEnv ? 'info' : 'debug';

const myFormat = serviceName => (
  isProdEnv
    ? format.combine(
      format.label({ label: serviceName }),
      format.timestamp(),
      format.json(),
    )
    : format.combine(
      format.label({ label: serviceName }),
      format.colorize(),
      format.timestamp(),
      format.printf(formatMessage),
    )
);

const myTransports = isProdEnv
  ? [
    new transports.File({
      filename: 'combined.log',
      level: 'info',
    }),
    new transports.File({
      filename: 'errors.log',
      level: 'error',
    }),
  ]
  : [
    new transports.Console(),
  ];

const logger = serviceName => createLogger({
  level,
  format: myFormat(serviceName),
  transports: myTransports,
});

module.exports = logger;
