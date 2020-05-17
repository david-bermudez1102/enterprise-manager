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
