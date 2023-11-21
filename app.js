const compression = require('compression');
const cors = require('cors');
require('dotenv').config();
const express = require('express');
const fileUpload = require('express-fileupload');
const helmet = require('helmet');
const morgan = require('morgan');

const { errorHandler } = require('./helpers');
const routes = require('./routes');
const { logger } = require('./utilities');

const app = express();

app.use(cors());
app.use(compression());
app.use(
  express.urlencoded({
    limit: '50mb',
    extended: true,
    parameterLimit: 1000000,
  })
);
app.use(
  express.json({
    limit: '50mb',
  })
);
app.use(helmet());
app.use(
  fileUpload({
    parseNested: true,
  })
);
app.use(morgan('[:date[web]] :method :url :status :response-time ms - :res[content-length]'));

app.use(routes);
app.use(errorHandler);

process.on('uncaughtException', function (err) {
  logger.error(err);
});

process.on('unhandledRejection', function (reason) {
  logger.error(reason);
});

module.exports = app;
