const cookiesToObj = () => {
  return document.cookie.split(';').reduce((acc, cookie) => {
    const [key = '', value = ''] = cookie.split('=');
    return { ...acc, [key.trim()]: value.trim() };
  }, {});
};

export const baseUrlFromLocation = () => {
  return location.origin;
};

export const loadUserDataFromCookie = () => {
  const cookies = cookiesToObj() || {};
  const userDataBase64 = cookies['__GH_connect'];
  if (!userDataBase64) {
    return undefined;
  }
  return JSON.parse(atob(userDataBase64));
};

export const logoutGithub = async ({ userToken, logoutUrl } = {}) => {
  const oauthHandler = window.open(
    `${logoutUrl}?userToken=${userToken}`,
    '_blank',
    'popup=1,width=600,height=500'
  );
  oauthHandler.name = '__oauthPopupWindows';
  return new Promise((resolve) => {
    const checkClosed = () => {
      if (oauthHandler.closed) {
        resolve(loadUserDataFromCookie());
      } else {
        setTimeout(checkClosed, 300);
      }
    };
    checkClosed();
  });
};

export const getGithubUserData = async ({ baseUrl, redirectUrl } = {}) => {
  const url = `${baseUrl}?redirectUrl=${redirectUrl}`;
  const oauthHandler = window.open(
    url,
    '_blank',
    'popup=1,width=600,height=500'
  );
  oauthHandler.name = '__oauthPopupWindows';
  return new Promise((resolve) => {
    const checkClosed = () => {
      if (oauthHandler.closed) {
        resolve(loadUserDataFromCookie());
      } else {
        setTimeout(checkClosed, 300);
      }
    };
    checkClosed();
  });
};
