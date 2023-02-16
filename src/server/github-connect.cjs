const { OAuthApp, handleRequest } = require('@octokit/oauth-app');

const closeModalScript = `
    <script type="application/javascript">
      window.close();
    </script>
`;

class GithubConnectServer {
  constructor({ pathPrefix, appId, clientId, clientSecret }) {
    this._pathPrefix = pathPrefix;
    this._oAuthApp = new OAuthApp({
      appId,
      clientId,
      clientSecret,
    });
  }

  connect(app) {
    const pathPrefix = this._pathPrefix;
    app.use(async (req, res, next) => {
      const { path } = req;
      if (path && path.startsWith(pathPrefix)) {
        const { method, path, headers, originalUrl, query } = req;
        const octokitRequest = {
          method,
          url: originalUrl,
          headers,
          text: async () => '',
        };
        try {
          if (path.endsWith('/logout')) {
            try {
              await this._oAuthApp.deleteToken({
                token: query.userToken,
              });
            } catch (e) {
              console.info('Ignoring error on invalidate token.', e);
            }
            res.set('Set-Cookie', `__GH_connect=;Path=/;SameSite=Strict;`);
            res.status(200).end(closeModalScript);
            return;
          }
          if (path.endsWith('/callback')) {
            const {
              authentication: { token },
            } = await this._oAuthApp.createToken({
              code: query.code,
            });
            const octokit = await this._oAuthApp.getUserOctokit({
              token,
              state: query.state,
            });
            const {
              login,
              name,
              avatar_url: avatarUrl,
              id,
              url: profileUrl,
            } = await octokit.request('GET /user').then(({ data }) => data);
            res.set(
              'Set-Cookie',
              `__GH_connect=${Buffer.from(
                JSON.stringify({
                  id,
                  avatarUrl,
                  profileUrl,
                  login,
                  name,
                  token,
                })
              ).toString('base64')};Path=/;SameSite=Strict;`
            );
            res.status(200).end(closeModalScript);
            return;
          }
          const { status, headers, text } = await handleRequest(
            this._oAuthApp,
            { pathPrefix },
            octokitRequest
          );
          res.set(headers);
          res.status(status).end(text);
          return;
        } catch (e) {
          console.error('Erro on parse github oauth request.', e);
        }
      }
      next();
    });
  }
}

module.exports = {
  connectMiddleware: ({
    app,
    appId,
    clientId,
    clientSecret,
    pathPrefix = '/api/github/oauth',
  }) => {
    console.info('Connect Github backend');
    const connectApp = new GithubConnectServer({
      pathPrefix,
      appId,
      clientId,
      clientSecret,
    });
    connectApp.connect(app);
  },
};
