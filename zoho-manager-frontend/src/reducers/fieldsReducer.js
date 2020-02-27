export const fieldsReducer = (state = [], action) => {
  switch (action.type) {
    case "ADD_FIELD":
      return [...state, action.field];
    case "ADD_FIELDS":
      console.log([...state, ...action.fields]);
      return [...state, ...action.fields];
    case "CLEAR_FIELDS":
      return [];
    default:
      return state;
  }
};
