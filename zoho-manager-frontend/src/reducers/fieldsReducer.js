export const fieldsReducer = (state = [], action) => {
  switch (action.type) {
    case "ADD_FIELD":
      return [...state, action.field];
    case "FETCH_FIELDS":
      return [...action.fields];
      case "REMOVE_FIELD":
        return [...state.filter(field => field.id !== action.fieldId)]
    default:
      return state;
  }
};
