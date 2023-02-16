import express from 'express';
import { connectMiddleware } from '../server/github-connect';
const app = express();

const { APP_ID, CLIENT_ID, CLIENT_SECRET, STATIC_FILES } = process.env;

connectMiddleware({
  app,
  pathPrefix: '/backend/api/github/oauth',
  appId: APP_ID,
  clientId: CLIENT_ID,
  clientSecret: CLIENT_SECRET,
});

if (STATIC_FILES) {
  app.use(express.static(STATIC_FILES));
}

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listen on port :${port}`);
});
