export const sessionReducer = (
  state = { isLoggedIn: false, currentUser: {} },
  action
) => {
  switch (action.type) {
    case 'ADD_SESSION': //Login
      return {
        ...state,
        isLoggedIn: action.isLoggedIn,
        currentUser: action.currentUser
      };
    case 'REMOVE_SESSION': //Logout
      return {
        ...state,
        isLoggedIn: false,
        currentUser: {}
      };

    default:
      return state;
  }
};
