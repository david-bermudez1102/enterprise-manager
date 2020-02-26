export const valuesReducer = (state = [], action) => {
  switch (action.type) {
    case "ADD_VALUE":
      return [...state, action.value];
    case "ADD_VALUES":
      console.log([...state, ...action.values]);
      return [...state, ...action.values];
    default:
      return state;
  }
};
