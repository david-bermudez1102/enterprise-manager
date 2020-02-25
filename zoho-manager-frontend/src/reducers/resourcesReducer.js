export const resourcesReducer = (state = [], action) => {
  switch (action.type) {
    case "ADD_RESOURCES":
      return [...state, action.resource];
    case "ADD_RESOURCES":
      return [...state, ...action.resources];
    default:
      return state;
  }
};
