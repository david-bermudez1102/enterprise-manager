export const recordsReducer = (state = [], action) => {
  switch (action.type) {
    case "ADD_RECORD":
      return [...state, action.record];

    case "FETCH_RECORDS":
      return [
        ...state,
        ...action.records.filter(
          record => !state.some(rec => record.id === rec.id)
        )
      ];
    case "CLEAR_RECORDS":
      return [];
    default:
      return state;
  }
};
