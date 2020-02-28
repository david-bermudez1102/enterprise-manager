export const resourcesReducer = (state = [], action) => {
  switch (action.type) {
    case "ADD_RESOURCE":
      return [...state, action.resource];
    case "FETCH_RESOURCES":
      return [
        ...state,
        ...action.resources.filter(
          resource => !state.some(res => resource.id === res.id)
        )
      ];
    default:
      return state;
  }
};
