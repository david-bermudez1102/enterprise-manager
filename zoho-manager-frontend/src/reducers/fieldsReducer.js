export const fieldsReducer = (state = [], action) => {
  switch (action.type) {
    case "ADD_FIELD":
      return [...state, action.field];
    case "FETCH_FIELDS":
      return [
        ...state,
        ...action.fields.filter(
          field => !state.some(f => field.id === f.id)
        )
      ];
    case "REMOVE_FIELD":
      return [...state.filter(field => field.id !== action.fieldId)];
    default:
      return state;
  }
};
