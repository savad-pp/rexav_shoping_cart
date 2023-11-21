const { HTTP_CODES } = require('../configs');

const formatResponse = (res, statusCode, message, data) =>
  res.status(statusCode).json({
    success: true,
    message,
    data,
  });

exports.success = (res, data, message) => formatResponse(res, HTTP_CODES.OK, message, data);
exports.created = (res, data, message) => formatResponse(res, HTTP_CODES.CREATED, message, data);
exports.noContent = (res) => res.status(HTTP_CODES.NO_CONTENT).send();
