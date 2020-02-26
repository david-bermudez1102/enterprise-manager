export const recordsReducer = (state = [], action) => {
  switch (action.type) {
    case "ADD_RECORD":
      console.log([...state, action.record]);
      return [...state, action.record];

    case "ADD_RECORDS":
      return [...state, ...action.records];
    default:
      return state;
  }
};
