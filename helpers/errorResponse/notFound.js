const { HTTP_CODES } = require('../../configs');

class NotFoundException extends Error {
  constructor(message) {
    super(message);
    this.type = 'Not Found';
    this.statusCode = HTTP_CODES.NOT_FOUND;
  }
}

module.exports = NotFoundException;
