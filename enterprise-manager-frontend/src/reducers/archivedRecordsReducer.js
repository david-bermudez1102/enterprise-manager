export const archivedRecords = (state = {}, action) => {
  switch (action.type) {
    case "ADD_ARCHIVED_RECORD":
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
    case "FETCH_ARCHIVED_RECORDS":
      return action.records;

    case "REMOVE_ARCHIVED_RECORD":
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

export const sortedArchivedRecords = (state = {}, action) => {
  switch (action.type) {
    case "SET_SORTED_ARCHIVED_RECORDS":
      return { ...state, [action.formId]: action.records };

    case "REMOVE_ARCHIVED_RECORD":
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

export const archivedRecordsSortedBy = (state = [], action) => {
  switch (action.type) {
    case "SET_ARCHIVED_SORTED_BY":
      return [
        ...state.filter(res => res.id !== action.resource.id),
        action.resource,
      ];
    default:
      return state;
  }
};
