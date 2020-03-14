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
    case "UPDATE_RECORD":
      const record = state.find(
        record => record.id === parseInt(action.record.id)
      );
      console.log([
        ...state.map(rec =>
          rec.id === record.id ? { ...rec, ...action.record } : rec
        )
      ]);
      return [
        ...state.map(rec =>
          rec.id === record.id ? { ...rec, ...action.record } : rec
        )
      ];
    case "CLEAR_RECORDS":
      return [];
    default:
      return state;
  }
};
