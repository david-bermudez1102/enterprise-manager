export const sessionReducer = (
  state = { isLoggedIn: false, currentUser: {} },
  action
) => {
  switch (action.type) {
    case "ADD_SESSION": //Login
      return {
        isLoggedIn: action.isLoggedIn,
        currentUser: action.currentUser
      };
    case "UPDATE_SESSION":
      return { currentUser: action.currentUser };
    case "REMOVE_SESSION": //Logout
      return {
        isLoggedIn: false,
        currentUser: {}
      };

    default:
      return state;
  }
};
