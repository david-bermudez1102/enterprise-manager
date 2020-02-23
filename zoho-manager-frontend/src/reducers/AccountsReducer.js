export const AccountsReducer = (state = { accounts: [] }, action) => {
  switch (action.type) {
    case "ADD_ACCOUNT":
      console.log({
        ...state,
        accounts: [...state.accounts, action.account]
      });
      return {
        ...state,
        accounts: [...state.accounts, action.account]
      };

    case "ADD_ACCOUNTS":
      console.log({
        ...state,
        accounts: [...state.accounts, ...action.accounts]
      });
      return {
        ...state,
        accounts: [...state.accounts, ...action.accounts]
      };
    default:
      return state;
  }
};
