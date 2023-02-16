import React from 'react';
import classNames from 'classnames';
import { useUserData } from '../hooks/useUserData.js';
import { defaultConfig } from './config.js';
import { LogoutButton } from './LogoutButton.js';

export const LoggedAccount = ({ config = defaultConfig }) => {
  const { styles: { loggedAccount: { mainClass, className } = {} } = {} } =
    config;
  const { userData } = useUserData();
  if (!userData) {
    return null;
  }
  const { login, avatarUrl } = userData;
  return (
    <div className={classNames(mainClass, className)}>
      <img className="avatar" src={avatarUrl} />
      <div className="username">{login}</div>
      <div className="logout-btn">
        <LogoutButton config={config} />
      </div>
    </div>
  );
};
