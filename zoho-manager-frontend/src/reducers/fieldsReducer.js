export const fieldsReducer = (state = [], action) => {
  switch (action.type) {
    case "ADD_FIELD":
      return [...state, action.field];
    case "ADD_FIELDS":
      return [...state, ...action.fields];
    default:
      return state;
  }
};
