export const AccountsReducer = (state = [], action) => {
  switch (action.type) {
    case "ADD_ACCOUNT":
      console.log([...state, action.account]);
      return [...state, action.account]
    case "ADD_ACCOUNTS":
      console.log([...state, ...action.accounts]);
      return [...state, ...action.accounts]
    default:
      return state;
  }
};
