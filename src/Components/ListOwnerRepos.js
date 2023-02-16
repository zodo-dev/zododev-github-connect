import React, { useState } from 'react';
import classNames from 'classnames';
import { defaultConfig } from './config.js';
import { useOwnerRepo } from '../hooks/useOwnerRepo.js';
import { Select } from './Select.js';
import lockIcon from './icons/lock.svg';
import globeIcon from './icons/globe.svg';
import { useOwner } from '../hooks/useOwner.js';

export const ListOwnerRepos = ({ config = defaultConfig }) => {
  const {
    labels,
    styles: { listOwnerRepos: { mainClass, className } = {} } = {},
  } = config;
  const [isLoading, setIsLoading] = useState(false);
  const { selectedOwner } = useOwner();
  const { ownerRepos, selectedRepo, loadOwnerRepos, selectOwnerRepo } =
    useOwnerRepo();
  if (!selectedOwner) {
    return null;
  }
  if (!ownerRepos && !isLoading) {
    setIsLoading(true);
    loadOwnerRepos();
  }
  if (isLoading && ownerRepos) {
    setIsLoading(false);
  }
  const onChange = (repoId) => {
    const repo = ownerRepos?.find(({ id }) => id === repoId);
    selectOwnerRepo(repo);
  };
  const options = ownerRepos?.map(({ id, isPrivate, name }) => ({
    value: id,
    icon: isPrivate ? lockIcon : globeIcon,
    label: name,
  }));
  return (
    <div className={classNames(mainClass, className)}>
      <Select
        onChange={onChange}
        config={config}
        selectedIcon={
          selectedRepo ? (selectedRepo?.isPrivate ? lockIcon : globeIcon) : null
        }
        isLoading={isLoading}
        selectedLabel={selectedRepo?.name || labels.selectOwnerRepo}
        options={options}
        selectedValue={selectedRepo?.id}
      />
    </div>
  );
};
