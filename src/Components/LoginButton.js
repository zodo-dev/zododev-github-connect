import React from 'react';
import classNames from 'classnames';
import { defaultConfig } from './config.js';
import { useUserData } from '../hooks/useUserData.js';
import githubIcon from './icons/github.svg';

export const LoginButton = ({ config = defaultConfig }) => {
  const {
    labels,
    styles: { loginButton: { mainClass, className } = {} } = {},
  } = config;
  const { userData, loginWithGithub } = useUserData();

  if (userData) {
    return null;
  }
  return (
    <button
      onClick={loginWithGithub}
      type="button"
      className={classNames(mainClass, className)}
    >
      <img src={githubIcon} />
      {labels.loginButton}
    </button>
  );
};
