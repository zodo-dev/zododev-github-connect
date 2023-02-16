const dotenv = require('dotenv');
const path = require('node:path');

const { connectMiddleware } = require('../src/server/github-connect.cjs');
dotenv.config({
  path: path.resolve(process.cwd(), `.env.${process.env.NODE_ENV}`),
});

module.exports = (router) => {
  const { APP_ID, CLIENT_ID, CLIENT_SECRET } = process.env;
  connectMiddleware({
    app: router,
    appId: APP_ID,
    clientId: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    pathPrefix: '/backend/api/github/oauth',
  });
};
