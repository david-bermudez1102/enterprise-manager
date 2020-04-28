export const recordFieldsReducer = (state = [], action) => {
  switch (action.type) {
    case "ADD_RECORD_FIELD":
      return [...state, action.recordField];
    case "UPDATE_RECORD_FIELD":
      return [
        ...state.map(f =>
          f.id === parseInt(action.recordFieldId) ? action.recordField : f
        )
      ];
    case "FETCH_RECORD_FIELDS":
      return [
        ...state,
        ...action.recordFields.filter(
          recordField => !state.some(f => recordField.id === f.id)
        )
      ];
    case "REMOVE_RECORD_FIELD":
      return [
        ...state.filter(
          recordField => recordField.id !== parseInt(action.recordFieldId)
        )
      ];
    default:
      return state;
  }
};
