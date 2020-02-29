export const fieldsReducer = (state = [], action) => {
  switch (action.type) {
    case "ADD_FIELD":
      return [...state, action.field];
    case "FETCH_FIELDS":
      return [
        ...state,
        ...action.fields.filter(field => !state.some(f => field.id === f.id))
      ];
    case "UPDATE_FIELD":
      
      const field = state.find(field => field.id === parseInt(action.fieldId));
      console.log([...state.map(f => (f === field ? action.field : field))]);
      return [...state.map(f => (f === field ? action.field : field))];
    case "REMOVE_FIELD":
      return [...state.filter(field => field.id !== parseInt(action.fieldId))];
    default:
      return state;
  }
};
