import { useContext, useCallback, useEffect } from 'react';
import { Context } from '../state/Context';
import { ownerListRepos } from '../utils/gh-utils.js';
import { ACTIONS } from '../state/Reducer.js';

export const useOwnerRepo = () => {
  const [{ ownerRepos, selectedOwner, selectedRepo, userData }, dispatch] =
    useContext(Context);
  const { token } = userData || {};
  const { login, type } = selectedOwner || {};
  const repos = ownerRepos?.[selectedOwner?.login];
  const loadOwnerRepos = useCallback(
    (force = false) => {
      if (!login || !type || !token) {
        return;
      }
      if (!repos?.length || force) {
        ownerListRepos({ token, login, type }).then((repos) => {
          dispatch({ type: ACTIONS.LIST_RESPOS, payload: { [login]: repos } });
        });
      }
    },
    [login, token, type]
  );

  const selectOwnerRepo = useCallback((repo) => {
    dispatch({ type: ACTIONS.SELECT_OWNER_REPO, payload: repo });
  }, []);

  useEffect(() => {
    if (login && token && !repos) {
      loadOwnerRepos();
    }
  }, [login, token]);
  useEffect(() => {
    if (selectedRepo && login !== selectedRepo.owner) {
      selectOwnerRepo(undefined);
    }
  }, [login, selectedRepo?.owner]);
  return {
    ownerRepos: repos,
    loadOwnerRepos,
    selectOwnerRepo,
    selectedRepo,
  };
};
