export const recordsReducer = (state = [], action) => {
  switch (action.type) {
    case "ADD_RECORD":
      return [
        ...state,
        {
          ...action.record,
          listingId: state.filter(r => r.formId === action.formId).length + 1,
        },
      ];
    case "FETCH_RECORDS":
      return action.records;
    case "UPDATE_RECORD":
      return [
        ...state.map(rec =>
          rec.id === action.id ? { ...rec, ...action.record } : rec
        ),
      ];
    case "REMOVE_RECORDS":
      return [
        ...state.filter(
          record => record.resourceId !== parseInt(action.resourceId)
        ),
      ];
    case "REMOVE_RECORD":
      return [...state.filter(record => record.id !== parseInt(action.id))];
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
        action.resource,
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
        ...action.records,
      ];
    case "ADD_VALUE":
      return [...state].map(value =>
        parseInt(value.id) === parseInt(action.value.recordId)
          ? {
              ...value,
              [action.value.recordFieldId]: action.value.content,
            }
          : value
      );
    case "UPDATE_VALUE":
      return [...state].map(value =>
        parseInt(value.id) === parseInt(action.value.recordId)
          ? {
              ...value,
              [action.value.recordFieldId]: action.value.content,
            }
          : value
      );
    case "REMOVE_RECORD":
      return [...state.filter(record => record.id !== parseInt(action.id))];
    default:
      return state;
  }
};
