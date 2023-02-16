import React, { useState } from 'react';
import { ConnectContainer } from '../Components/ConnectContainer.js';

const Template = (args) => {
  const [objData, setObjectData] = useState({
    owner: undefined,
    repo: undefined,
    branch: undefined,
  });

  const onChangeData = (key, value) => {
    const newObjData = { ...objData, [key]: value };
    setObjectData(newObjData);
  };
  return (
    <ConnectContainer
      {...args}
      onSelectOwner={(owner) => onChangeData('owner', owner)}
      onSelectRepo={(repo) => onChangeData('repo', repo)}
      onSelectBranch={(branch) => onChangeData('branch', branch)}
    />
  );
};

export const ConnectContainerTest = Template.bind({});
ConnectContainerTest.args = {};
ConnectContainerTest.storyName = 'ConnectContainer Full';

export default {
  title: 'ConnectContainer',
  component: ConnectContainer,
  actions: {},
  argTypes: {
    selectedOwner: {
      control: { type: 'text', description: 'Selected owner.' },
    },
    selectedRepo: {
      control: { type: 'text', description: 'Selected repository for owner' },
    },
    selectedBranchs: {
      control: { type: 'text', description: 'Selected branch for repositoy.' },
    },
    ...[
      'onUserData',
      'onListOwners',
      'onListRepos',
      'onListBranchs',
      'onSelectOwner',
      'onSelectRepo',
      'onSelectBranch',
      'onReset',
    ].reduce(
      (acc, actName) => ({
        ...acc,
        [actName]: {
          name: actName,
          action: actName,
          description: `On ${actName} triggered.`,
        },
      }),
      {}
    ),
  },
};
