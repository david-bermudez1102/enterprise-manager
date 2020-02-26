export const valuesReducer = (state = [], action) => {
  switch (action.type) {
    case "ADD_VALUES":
      return [...state, ...action.values];
    default:
      return state;
  }
};
