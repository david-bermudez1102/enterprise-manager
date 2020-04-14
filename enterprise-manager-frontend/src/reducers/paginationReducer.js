export const pagination = (state = { limit: 25, id: 1 }, action) => {
  switch (action.type) {
    case "SET_LIMIT":
      return { limit: action.limit, id: action.id };
    default:
      return state;
  }
};
