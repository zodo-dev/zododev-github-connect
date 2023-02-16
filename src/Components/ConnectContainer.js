import React from 'react';
import classNames from 'classnames';
import { LoginButton } from './LoginButton';
import { Store } from '../state/Store.js';
import { useUserData } from '../hooks/useUserData.js';
import { LoggedAccount } from './LoggedAccount.js';
import { defaultConfig } from './config.js';
import { ListOwners } from './ListOwners.js';
import { ListOwnerRepos } from './ListOwnerRepos.js';
import { ListRepoBranchs } from './ListRepoBranchs.js';
import { baseUrlFromLocation } from '../utils/utils.js';

const Container = ({ config = defaultConfig }) => {
  const { userData } = useUserData();
  const { styles: { container: { mainClass, className } = {} } = {} } = config;
  if (!userData) {
    return (
      <div className={classNames(mainClass, className)}>
        <LoginButton config={config} />
      </div>
    );
  }
  return (
    <div className={classNames(mainClass, className)}>
      <LoggedAccount config={config} />
      <ListOwners config={config} />
      <ListOwnerRepos config={config} />
      <ListRepoBranchs config={config} />
    </div>
  );
};

export const ConnectContainer = ({
  config = defaultConfig,
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
  baseUrl = `${baseUrlFromLocation()}/backend/api/github/oauth/login`,
  redirectUrl = `${baseUrlFromLocation()}/backend/api/github/oauth/callback`,
  logoutUrl = `${baseUrlFromLocation()}/backend/api/github/oauth/logout`,
}) => (
  <Store
    {...{
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
    }}
  >
    <Container config={config} />
  </Store>
);
