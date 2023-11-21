const redis = require('redis');
const { RateLimiterRedis } = require('rate-limiter-flexible');
const loggerUtil = require('../utilities/logger');

const redisClient = redis.createClient({
  url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
  legacyMode: true,
  enable_offline_queue: false,
});

(async () => {
  try {
    await redisClient.connect();
  } catch (ex) {
    loggerUtil.error({
      message: ex.toString(),
      level: 'error',
    });
  }
})();

const rateLimiter = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: 'rl-middleware',
  points: 7,
  duration: 60,
});

module.exports = async (req, res, next) => {
  try {
    const ipAddress = (
      req.headers['x-forwarded-for'] ||
      req.connection.remoteAddress ||
      req.socket.remoteAddress ||
      req.connection.socket.remoteAddress
    ).split(',')[0];
    const rateLimiterRes = await rateLimiter.consume(ipAddress);
    res.set({
      'Retry-After': rateLimiterRes.msBeforeNext / 1000,
      'X-RateLimit-Limit': 6,
      'X-RateLimit-Remaining': rateLimiterRes.remainingPoints,
      'X-RateLimit-Reset': new Date(Date.now() + rateLimiterRes.msBeforeNext),
    });
    return next();
  } catch (e) {
    res.set({
      'Retry-After': e.msBeforeNext / 1000,
      'X-RateLimit-Limit': 6,
      'X-RateLimit-Remaining': e.remainingPoints,
      'X-RateLimit-Reset': new Date(Date.now() + e.msBeforeNext),
    });
    return res.status(401).send({
      status: false,
      data: 'Too many request',
    });
  }
};
