export const valuesReducer = (state = {}, action) => {
  switch (action.type) {
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
          parseInt(value.id) === parseInt(action.value.id)
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

    case "FETCH_VALUES":
      return action.values;
    case "REMOVE_VALUES":
      return {
        ...state,
        [action.formId]: (state[action.formId] || []).filter(
          v => v.recordId !== action.recordId
        ),
      };

    default:
      return state;
  }
};

export const archivedValues = (state = {}, action) => {
  switch (action.type) {
    case "ADD_ARCHIVED_VALUES":
      return {
        ...state,
        [action.formId]: [
          ...(state[action.formId] || []),
          { ...action.values },
        ],
      };

    case "FETCH_ARCHIVED_VALUES":
      return action.values;
    case "REMOVE_ARCHIVED_VALUES":
      return {
        ...state,
        [action.formId]: (state[action.formId] || []).filter(
          v => v.recordId !== action.recordId
        ),
      };

    default:
      return state;
  }
};
