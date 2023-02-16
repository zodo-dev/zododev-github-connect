import { useContext, useCallback, useEffect } from 'react';
import { Context } from '../state/Context';
import { userListOwners } from '../utils/gh-utils.js';
import { ACTIONS } from '../state/Reducer.js';

export const useOwner = () => {
  const [{ owners, selectedOwner, userData }, dispatch] = useContext(Context);
  const { login, token } = userData || {};
  const loadOwners = useCallback(
    (force = false) => {
      if (!owners?.length || force) {
        userListOwners({ token }).then((orgs) => {
          const { avatarUrl, id, url } = userData || {};
          const owners = [{ login, avatarUrl, id, url, type: 'user' }, ...orgs];
          dispatch({ type: ACTIONS.LIST_OWNERS, payload: owners });
        });
      }
    },
    [login, token]
  );
  const selectOwner = useCallback((owner) => {
    dispatch({ type: ACTIONS.SELECT_OWNER, payload: owner });
  }, []);
  useEffect(() => {
    if (login && token && !owners) {
      loadOwners();
    }
  }, [owners?.length, login, token]);
  return {
    owners,
    selectedOwner,
    loadOwners,
    selectOwner,
  };
};
