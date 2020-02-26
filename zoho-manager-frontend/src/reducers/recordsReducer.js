export const recordsReducer = (state = [], action) => {
  switch (action.type) {
    case "ADD_RECORD":
      return [...state, action.record];

    case "ADD_RECORDS":
      console.log([...state, action.records]);
      return [...state, ...action.records];
    default:
      return state;
  }
};
