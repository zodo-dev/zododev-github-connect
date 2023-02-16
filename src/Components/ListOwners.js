import React, { useState } from 'react';
import classNames from 'classnames';
import { defaultConfig } from './config.js';
import { useOwner } from '../hooks/useOwner.js';
import { Select } from './Select.js';

export const ListOwners = ({ config = defaultConfig }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { labels, styles: { listOwners: { mainClass, className } = {} } = {} } =
    config;
  const { owners, selectedOwner, loadOwners, selectOwner } = useOwner();
  if (!owners && !isLoading) {
    setIsLoading(true);
    loadOwners();
  }
  if (isLoading && owners) {
    setIsLoading(false);
  }
  const onChange = (selectedId) => {
    if (!selectedId) {
      return;
    }
    const owner = owners?.find(({ id }) => id === selectedId);
    selectOwner(owner);
  };
  const options = owners?.map(({ id, avatarUrl, login }) => ({
    value: id,
    icon: avatarUrl,
    label: login,
  }));
  return (
    <div className={classNames(mainClass, className)}>
      <Select
        onChange={onChange}
        config={config}
        selectedIcon={selectedOwner?.avatarUrl}
        isLoading={isLoading}
        selectedLabel={selectedOwner?.login || labels.selectOwner}
        options={options}
        selectedValue={selectedOwner?.id}
      />
    </div>
  );
};
