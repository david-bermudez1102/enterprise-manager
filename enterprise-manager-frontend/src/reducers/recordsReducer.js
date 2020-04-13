export const recordsReducer = (state = [], action) => {
  switch (action.type) {
    case "ADD_RECORD":
      return [...state, action.record];

    case "FETCH_RECORDS":
      return [
        ...state
          .filter(record => action.records.some(rec => rec.id === record.id))
          .map(record => {
            const updatedRecord = action.records.find(r => r.id === record.id);
            if (record !== updatedRecord) return updatedRecord;
            return record;
          }),
        ...action.records.filter(
          record => !state.some(rec => record.id === rec.id)
        )
      ];
    case "UPDATE_RECORD":
      const record = state.find(
        record => record.id === parseInt(action.record.id)
      );
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
