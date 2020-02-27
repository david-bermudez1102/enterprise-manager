export const valuesReducer = (state = [], action) => {
  switch (action.type) {
    case "ADD_VALUES":
      return [...action.values];
    default:
      return state;
  }
};
