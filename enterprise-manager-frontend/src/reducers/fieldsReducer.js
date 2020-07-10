export const fieldsReducer = (state = {}, action) => {
  switch (action.type) {
    case "ADD_FIELD":
      return {
        ...state,
        [action.field.formId]: [
          ...(state[action.field.formId] || []),
          action.field
        ]
      }
    case "FETCH_FIELDS":
      return action.fields.reduce((r, a) => {
        r[a.formId] = [...(r[a.formId] || []), a]
        return r
      }, {})

    case "UPDATE_FIELD":
      return {
        ...state,
        [action.field.formId]: (state[action.field.formId] || []).map(field =>
          field.id === action.field.id ? action.field : field
        )
      }
    case "REMOVE_FIELD":
      return {
        ...state,
        [action.field.formId]: (state[action.field.formId] || []).filter(
          field => field.id !== action.field.id
        )
      }
    default:
      return state
  }
}
