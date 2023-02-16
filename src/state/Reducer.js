export const ACTIONS = {
  USER_LOGIN: 'USER_LOGIN',
  LIST_OWNERS: 'LIST_OWNERS',
  LIST_RESPOS: 'LIST_RESPOS',
  LIST_BRANCHS: 'LIST_BRANCHS',
  SELECT_OWNER: 'SELECT_OWNER',
  SELECT_OWNER_REPO: 'SELECT_OWNER_REPO',
  SELECT_REPO_BRANCH: 'SELECT_REPO_BRANCH',
  RESET: 'RESET',
};

const setStateValue = (keyValue, merge) => (state, payload) => {
  if (!keyValue) {
    return state;
  }
  if (!merge) {
    return {
      ...state,
      [keyValue]: payload,
    };
  }
  const currentValue = state[keyValue] || {};
  return {
    ...state,
    [keyValue]: { ...currentValue, ...payload },
  };
};

const ACTIONS_EVENTS = {
  USER_LOGIN: { event: 'onUserData', updateState: setStateValue('userData') },
  LIST_OWNERS: { event: 'onListOwners', updateState: setStateValue('owners') },
  LIST_RESPOS: {
    event: 'onListRepos',
    updateState: setStateValue('ownerRepos', true),
  },
  LIST_BRANCHS: {
    event: 'onListBranchs',
    updateState: setStateValue('repoBranchs', true),
  },
  SELECT_OWNER: {
    event: 'onSelectOwner',
    updateState: setStateValue('selectedOwner'),
  },
  SELECT_OWNER_REPO: {
    event: 'onSelectRepo',
    updateState: setStateValue('selectedRepo'),
  },
  SELECT_REPO_BRANCH: {
    event: 'onSelectBranch',
    updateState: setStateValue('selectedBranch'),
  },
  RESET: {
    event: 'onReset',
    updateState: (state) => {
      return {
        ...state,
        userData: undefined,
        owners: undefined,
        ownerRepos: undefined,
        repoBranchs: undefined,
        selectedOwner: undefined,
        selectedRepo: undefined,
        selectedBranch: undefined,
      };
    },
  },
};

const fireEvent = (state, eventName, value) => {
  const evt = state?.events?.current[eventName];
  console.log(`fire: ${eventName}`, value);
  if (!evt || typeof evt !== 'function') {
    return;
  }
  (async () => evt(value))();
};

export const Reducer = (state, action) => {
  const { event, updateState } = ACTIONS_EVENTS[action?.type] || {};
  if (event) {
    fireEvent(state, event, action.payload);
  }
  return updateState(state, action.payload);
};
