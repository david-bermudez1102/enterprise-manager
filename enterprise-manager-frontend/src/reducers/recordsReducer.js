export const recordsReducer = (state = {}, action) => {
  switch (action.type) {
    case "ADD_RECORD":
      return {
        ...state,
        [action.formId]: [
          ...(state[action.formId] || []),
          {
            ...action.record,
            listingId: (state[action.formId] || []).length + 1,
          },
        ],
      };
    case "FETCH_RECORDS":
      return action.records;
    case "UPDATE_RECORD":
      return {
        ...state,
        [action.record.formId]: (state[action.record.formId] || []).map(rec =>
          rec.id === action.id ? { ...rec, ...action.record } : rec
        ),
      };
    case "REMOVE_RECORDS":
      const newRecords = { ...state };
      delete newRecords[action.resourceId];
      return newRecords;
    case "REMOVE_RECORD":
      return {
        ...state,
        [action.formId]: (state[action.formId] || []).filter(
          record => record.id !== parseInt(action.id)
        ),
      };
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

export const sortedRecords = (state = {}, action) => {
  switch (action.type) {
    case "SET_SORTED_RECORDS":
      return { ...state, [action.formId]: action.records };
    case "ADD_VALUES":
      return {
        ...state,
        [action.formId]: [
          ...(state[action.formId] || []),
          { ...action.values },
        ],
      };
    case "ADD_VALUE":
      return {
        ...state,
        [action.value.formId]: (state[action.value.formId] || []).map(value =>
          parseInt(value.id) === parseInt(action.value.recordId)
            ? {
                ...value,
                [action.value.recordFieldId]: action.value.content,
              }
            : value
        ),
      };
    case "UPDATE_VALUE":
      return {
        ...state,
        [action.value.formId]: (state[action.value.formId] || []).map(value =>
          parseInt(value.id) === parseInt(action.value.recordId)
            ? {
                ...value,
                [action.value.recordFieldId]: action.value.content,
              }
            : value
        ),
      };
    case "REMOVE_RECORD":
      return {
        ...state,
        [action.formId]: (state[action.formId] || []).filter(
          record => record.id !== parseInt(action.id)
        ),
      };
    default:
      return state;
  }
};
