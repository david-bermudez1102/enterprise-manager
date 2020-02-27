export const fieldsReducer = (state = [], action) => {
  switch (action.type) {
    case "ADD_FIELD":
      return [...state, action.field];
    case "ADD_FIELDS":
      return [...action.fields];
    case "CLEAR_FIELDS":
      return [];
    default:
      return state;
  }
};
