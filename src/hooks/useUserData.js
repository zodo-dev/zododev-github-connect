import { useContext, useCallback } from 'react';
import { Context } from '../state/Context';
import { ACTIONS } from '../state/Reducer.js';
import { getGithubUserData, logoutGithub } from '../utils/utils.js';

export const useUserData = () => {
  const [{ userData, logoutUrl, baseUrl, redirectUrl }, dispatch] =
    useContext(Context);
  const loginWithGithub = useCallback(() => {
    getGithubUserData({ baseUrl, redirectUrl }).then((response) => {
      dispatch({ type: ACTIONS.USER_LOGIN, payload: response });
    });
  }, []);
  const logout = useCallback(() => {
    const { token } = userData;
    logoutGithub({ userToken: token, logoutUrl }).then(() => {
      dispatch({ type: ACTIONS.RESET, payload: undefined });
    });
  }, []);
  return {
    userData,
    loginWithGithub,
    logout,
  };
};
