require('dotenv').config();

module.exports = {
  APP: {
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 3000,
    backendUrl: process.env.BACKEND_URL || 'http://localhost:3000',
  },
};
