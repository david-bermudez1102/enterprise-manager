export const sessionReducer = (
  state = { isLoggedIn: false, currentUser: {} },
  action
) => {
  switch (action.type) {
    case "ADD_SESSION": //Login
      return {
        ...state,
        isLoggedIn: action.isLoggedIn,
        currentUser: action.currentUser
      };

    default:
      return state;
  }
};
