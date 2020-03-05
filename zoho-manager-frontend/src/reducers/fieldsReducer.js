export const fieldsReducer = (state = [], action) => {
  switch (action.type) {
    case "ADD_FIELD":
      return [...state, action.field];
    case "FETCH_FIELDS":
      console.log([
        ...state,
        ...action.fields.filter(field => !state.some(f => field.id === f.id))
      ]);
      return [
        ...state,
        ...action.fields.filter(field => !state.some(f => field.id === f.id))
      ];
    case "UPDATE_FIELD":
      const field = state.find(field => field.id === parseInt(action.fieldId));
      return [...state.map(f => (f.id === field.id ? action.field : f))];
    case "REMOVE_FIELD":
      return [...state.filter(field => field.id !== parseInt(action.fieldId))];
    default:
      return state;
  }
};
