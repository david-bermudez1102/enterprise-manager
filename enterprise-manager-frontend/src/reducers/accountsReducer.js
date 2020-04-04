export const accountsReducer = (state = [], action) => {
  switch (action.type) {
    case "ADD_EMPLOYEE":
      return [...state, action.employee];
    case "FETCH_EMPLOYEES":
      return [
        ...state,
        ...action.employees.filter(
          employee => !state.some(e => employee.id === e.id)
        )
      ];
    case "UPDATE_ACCOUNT":
      return [
        ...state.map(e =>
          e.id === parseInt(action.account.id) ? action.account : e
        )
      ];
    case "ADD_MANAGER":
      return [...state, action.manager];
    case "FETCH_MANAGERS":
      return [
        ...state,
        ...action.managers.filter(
          manager => !state.some(m => manager.id === m.id)
        )
      ];
    case "REMOVE_ACCOUNT":
      return [
        ...state.filter(account => account.id !== parseInt(action.accountId))
      ];
    default:
      return state;
  }
};
