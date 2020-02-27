export const recordsReducer = (state = [], action) => {
  switch (action.type) {
    case "ADD_RECORD":
      return [...state, action.record];

    case "ADD_RECORDS":
      return [...action.records];
    case "CLEAR_RECORDS":
      return [];
    default:
      return state;
  }
};
