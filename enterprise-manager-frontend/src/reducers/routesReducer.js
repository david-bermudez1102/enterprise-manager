export const routes = (state = [], action) => {
  switch (action.type) {
    case "ADD_ROUTE":
      return [...state, action.path];
    default:
      return state;
  }
};
