const { HTTP_CODES } = require('../../configs');

class UnauthorizedException extends Error {
  constructor(message) {
    super(message);
    this.type = 'Unauthorized';
    this.statusCode = HTTP_CODES.UNAUTHORIZED;
  }
}

module.exports = UnauthorizedException;
