const { HTTP_CODES, MESSAGES } = require('../../configs');

class UnHandledException extends Error {
  constructor(err = null) {
    const message = MESSAGES.APP.serverError;
    super(message);
    this.type = 'Internal Server Error';
    this.err = err;
    this.statusCode = HTTP_CODES.INTERNAL_SERVER_ERROR;
  }
}

module.exports = UnHandledException;
