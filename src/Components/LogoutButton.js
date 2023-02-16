import React from 'react';
import classNames from 'classnames';
import { defaultConfig } from './config.js';
import { useUserData } from '../hooks/useUserData.js';
import logoutIcon from './icons/logout.svg';

export const LogoutButton = ({ config = defaultConfig }) => {
  const {
    labels,
    styles: { logoutButton: { mainClass, className } = {} } = {},
  } = config;
  const { userData, logout } = useUserData();
  if (!userData) {
    return null;
  }
  return (
    <button
      onClick={() => logout()}
      type="button"
      className={classNames(mainClass, className)}
    >
      <img src={logoutIcon} alt={labels.logoutButton} />
    </button>
  );
};
