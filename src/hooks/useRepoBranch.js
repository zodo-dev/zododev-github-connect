import { useContext, useCallback, useEffect } from 'react';
import { Context } from '../state/Store';
import { repoListBranchs } from '../utils/gh-utils.js';
import { ACTIONS } from '../state/Reducer.js';

export const useRepoBranch = () => {
  const [{ repoBranchs, selectedBranch, selectedRepo, userData }, dispatch] =
    useContext(Context);
  const { token } = userData || {};
  const { name: repoName, owner, id: repoId } = selectedRepo || {};
  const branches = repoBranchs?.[repoId];
  const loadRepoBranchs = useCallback(
    (force = false) => {
      if (!repoName || !owner || !token) {
        return;
      }
      if (!branches?.length || force) {
        repoListBranchs({ token, login: owner, repo: repoName, repoId }).then(
          (branchs) => {
            dispatch({
              type: ACTIONS.LIST_BRANCHS,
              payload: { [repoId]: branchs },
            });
          }
        );
      }
    },
    [repoName, token, owner]
  );

  const selectRepoBranch = useCallback((branch) => {
    dispatch({ type: ACTIONS.SELECT_REPO_BRANCH, payload: branch });
  }, []);
  useEffect(() => {
    if (selectedBranch && repoId !== selectedBranch?.repoId) {
      selectRepoBranch(undefined);
    }
  }, [repoId, selectedBranch?.repoId]);
  useEffect(() => {
    if (owner && repoName && token && !branches) {
      loadRepoBranchs();
    }
  }, [repoName, token, owner]);

  return {
    repoBranchs: branches,
    loadRepoBranchs,
    selectRepoBranch,
    selectedBranch,
  };
};
