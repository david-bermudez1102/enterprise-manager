export const token = (state = {}, action) => {
  switch (action.type) {
    case "ADD_TOKEN":
      return { token: action.token, name: action.name, activated: action.activated };
    case "REMOVE_TOKEN":
      return {};
    default:
      return state;
  }
};
