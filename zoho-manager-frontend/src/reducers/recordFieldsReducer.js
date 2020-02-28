export const recordFieldsReducer = (state = [], action) => {
  switch (action.type) {
    case "ADD_RECORD_FIELD":
      return [...state, action.recordField];
    case "FETCH_RECORD_FIELDS":
      return [
        ...state,
        ...action.recordFields.filter(
          recordField => !state.some(f => recordField.id === f.id)
        )
      ];
    case "REMOVE_RECORD_FIELD":
      return [
        ...state.filter(recordField => recordField.id !== action.recordFieldId)
      ];
    default:
      return state;
  }
};
