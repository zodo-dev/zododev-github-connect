import dotenv from 'dotenv';
import path from 'node:path';

import { connectMiddleware } from '../src/server/github-connect.js';

dotenv.config({
  path: path.resolve(process.cwd(), `.env.${process.env.NODE_ENV}`),
});

export default (router) => {
  const { APP_ID, CLIENT_ID, CLIENT_SECRET } = process.env;
  connectMiddleware({
    app: router,
    appId: APP_ID,
    clientId: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    pathPrefix: '/backend/api/github/oauth',
  });
};
