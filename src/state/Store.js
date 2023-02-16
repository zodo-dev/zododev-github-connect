import React, { createContext, useReducer } from 'react';
import { Reducer } from './Reducer';
import { loadUserDataFromCookie } from '../utils/utils.js';

export const Context = createContext({});

export const Store = ({
  children,
  selectedOwner,
  selectedRepo,
  selectedBranch,
  onUserData,
  onListOwners,
  onListRepos,
  onListBranchs,
  onSelectOwner,
  onSelectRepo,
  onSelectBranch,
  onReset,
  baseUrl,
  redirectUrl,
  logoutUrl,
}) => {
  const [state, dispatch] = useReducer(Reducer, {}, () => {
    return {
      userData: loadUserDataFromCookie(),
      selectedOwner,
      selectedRepo,
      selectedBranch,
      onUserData,
      onListOwners,
      onListRepos,
      onListBranchs,
      onSelectOwner,
      onSelectRepo,
      onSelectBranch,
      onReset,
      baseUrl,
      redirectUrl,
      logoutUrl,
      owners: undefined,
      ownerRepos: undefined,
      repoBranchs: undefined,
    };
  });
  return (
    <Context.Provider value={[state, dispatch]}>{children}</Context.Provider>
  );
};
