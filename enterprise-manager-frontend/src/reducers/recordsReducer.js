export const recordsReducer = (state = [], action) => {
  switch (action.type) {
    case "ADD_RECORD":
      return [...state, { ...action.record, listingId: state.length + 1 }];
    case "FETCH_RECORDS":
      return [
        ...state
          .filter(
            record =>
              record.formId !== action.formId ||
              action.records.some(rec => rec.id === record.id)
          )
          .map(record => {
            const updatedRecord = action.records.find(r => r.id === record.id);
            if (record !== updatedRecord && updatedRecord) return updatedRecord;
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

export const recordsSortedBy = (state = [], action) => {
  switch (action.type) {
    case "SET_SORTED_BY":
      return [
        ...state.filter(res => res.id !== action.resource.id),
        action.resource
      ];
    default:
      return state;
  }
};

export const sortedRecords = (state = [], action) => {
  switch (action.type) {
    case "SET_SORTED_RECORDS":
      return [
        ...state.filter(record => record.formId !== action.formId),
        ...action.records
      ];
    default:
      return state;
  }
};
