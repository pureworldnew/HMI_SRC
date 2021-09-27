import AccountService from '../../services/AccountService';

export const accountManagers = {
  state: {
    accounts: [],
    managers: []
  },
  reducers: {
    updateState(state, payload, name) {
      return { ...state, [name]: payload };
    },
    updateError(state, payload) {
      return { ...state, errors: payload };
    }
  },
  effects: (dispatch) => ({
    async getAccountManagers() {
      let result = await AccountService.getAccountManagers();
      let { accounts, managers } = result.data;
      managers =
        managers[0] && managers[0].AllManagers
          ? managers[0].AllManagers.split(',')
          : [];
      this.updateState(accounts, 'accounts');
      this.updateState(managers, 'managers');
    }
  })
};
