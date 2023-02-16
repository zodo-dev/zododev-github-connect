import React, { useEffect, useReducer, useRef } from 'react';
import { Reducer } from './Reducer';
import { loadUserDataFromCookie } from '../utils/utils.js';
import { Context } from './Context.js';

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
  const events = useRef({});
  useEffect(() => {
    events.current = {
      onUserData,
      onListOwners,
      onListRepos,
      onListBranchs,
      onSelectOwner,
      onSelectRepo,
      onSelectBranch,
      onReset,
    };
  }, [
    onUserData,
    onListOwners,
    onListRepos,
    onListBranchs,
    onSelectOwner,
    onSelectRepo,
    onSelectBranch,
    onReset,
  ]);
  const [state, dispatch] = useReducer(Reducer, {}, () => {
    return {
      events,
      userData: loadUserDataFromCookie(),
      selectedOwner,
      selectedRepo,
      selectedBranch,
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
