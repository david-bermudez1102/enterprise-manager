export const recordFieldsReducer = (state = {}, action) => {
  switch (action.type) {
    case "ADD_RECORD_FIELD":
      return {
        ...state,
        [action.recordField.formId]: [
          ...(state[action.recordField.formId] || []),
          action.recordField
        ]
      }
    case "UPDATE_RECORD_FIELD":
      return {
        ...state,
        [action.recordField.formId]: (
          state[action.recordField.formId] || []
        ).map(recordField =>
          recordField.id === action.recordField.id
            ? { ...recordField, ...action.recordField }
            : recordField
        )
      }
    case "FETCH_RECORD_FIELDS":
      return {
        ...state,
        [action.formId]: [
          ...(state[action.formId] || []).map(recordField =>
            action.recordFields.find(rF => rF.id === recordField.id)
              ? { ...action.recordFields.find(rF => rF.id === recordField.id) }
              : recordField
          ),
          ...action.recordFields.filter(
            recordField =>
              !(state[action.formId] || []).some(f => recordField.id === f.id)
          )
        ]
      }

    case "SORT_RECORD_FIELDS":
      return {
        ...state,
        [action.formId]: action.recordFields
      }
    case "REMOVE_RECORD_FIELD":
      return {
        ...state,
        [action.recordField.formId]: (
          state[action.recordField.formId] || []
        ).filter(recordField => recordField.id !== action.recordField.id)
      }
    default:
      return state
  }
}
