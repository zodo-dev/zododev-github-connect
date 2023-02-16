import React, { useState } from 'react';
import classNames from 'classnames';
import { defaultConfig } from './config.js';
import { useRepoBranch } from '../hooks/useRepoBranch.js';
import { Select } from './Select.js';
import { useOwnerRepo } from '../hooks/useOwnerRepo.js';

export const ListRepoBranchs = ({ config = defaultConfig }) => {
  const {
    labels,
    styles: { listRepoBranchs: { mainClass, className } = {} } = {},
  } = config;
  const [isLoading, setIsLoading] = useState(false);
  const { selectedRepo } = useOwnerRepo();
  const { loadRepoBranchs, repoBranchs, selectedBranch, selectRepoBranch } =
    useRepoBranch();
  if (!selectedRepo) {
    return null;
  }
  if (!repoBranchs && !isLoading) {
    setIsLoading(true);
    loadRepoBranchs();
  }
  if (isLoading && repoBranchs) {
    setIsLoading(false);
  }
  const onChange = (branchId) => {
    const branch = repoBranchs?.find(({ name }) => name === branchId);
    selectRepoBranch(branch);
  };
  const options = repoBranchs?.map(({ name }) => ({
    value: name,
    label: name,
  }));
  return (
    <div className={classNames(mainClass, className)}>
      <Select
        onChange={onChange}
        config={config}
        isLoading={isLoading}
        selectedLabel={selectedBranch?.name || labels.selectRepoBranch}
        options={options}
        selectedValue={selectedBranch?.id}
      />
    </div>
  );
};
