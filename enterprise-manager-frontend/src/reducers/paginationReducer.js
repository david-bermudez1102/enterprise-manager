export const pagination = (state = { limit: 25 }, action) => {
  switch (action.type) {
    case "SET_LIMIT":
      return { limit: action.limit };
    default:
      return state;
  }
};
