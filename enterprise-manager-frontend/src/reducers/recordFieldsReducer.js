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
            ? action.recordField
            : recordField
        )
      }
    case "FETCH_RECORD_FIELDS":
      return action.recordFields.reduce((r, a) => {
        r[a.formId] = [...(r[a.formId] || []), a]
        return r
      }, {})

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
