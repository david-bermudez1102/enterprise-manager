export const resourcesReducer = (state = [], action) => {
  switch (action.type) {
    case "ADD_RESOURCE":
      return [...state, action.resource];
    case "ADD_RESOURCES":
      return [...action.resources];
    default:
      return state;
  }
};
