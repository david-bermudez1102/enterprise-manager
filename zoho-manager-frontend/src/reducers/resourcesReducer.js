export const resourcesReducer = (state = {resources:[]}, action) => {
  switch (action.type) {
    case "ADD_RESOURCES":
      return {...state, resources:[...state.resources, action.resource]};
    case "ADD_RESOURCES":
      console.log([...state, ...action.resources]);
      return { ...state, resources: [...state.resources, action.resources] };
    default:
      return state;
  }
};
