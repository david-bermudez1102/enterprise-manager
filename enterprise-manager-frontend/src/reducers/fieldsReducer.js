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
      return {
        ...state,
        [action.formId]: [
          ...(state[action.formId] || [])
            .filter(field => action.fields.some(f => f.id === field.id))
            .map(field => {
              const updatedField = action.fields.find(f => f.id === field.id)
              if (updatedField && field !== updatedField) return updatedField
              return field
            }),
          ...action.fields.filter(
            field => !(state[action.formId] || []).some(f => field.id === f.id)
          )
        ]
      }

    case "UPDATE_FIELD":
      return {
        ...state,
        [action.field.formId]: (state[action.field.formId] || []).map(field =>
          field.id === action.field.id ? { ...field, ...action.field } : field
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
