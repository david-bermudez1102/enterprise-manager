export const valuesReducer = (state = {}, action) => {
  switch (action.type) {
    case "ADD_VALUES":
      return {
        ...state,
        [action.formId]: [{ ...action.values }, ...(state[action.formId] || [])]
      }

    case "ADD_VALUE":
      return {
        ...state,
        [action.value.formId]: (state[action.value.formId] || []).map(value =>
          parseInt(value.id) === parseInt(action.value.id)
            ? {
                ...value,
                [action.value.recordFieldId]: action.value.content
              }
            : value
        )
      }

    case "UPDATE_VALUE":
      return {
        ...state,
        [action.value.formId]: (state[action.value.formId] || []).map(value =>
          parseInt(value.id) === parseInt(action.value.id)
            ? {
                listingId: value.listingId,
                key: value.key,
                ...action.value
              }
            : value
        )
      }

    case "UPDATE_OR_CREATE_RECORD":
      return {
        ...state,
        [action.record.formId]: (state[action.record.formId] || []).some(
          r => parseInt(r.id) === parseInt(action.record.id)
        )
          ? [...(state[action.record.formId] || [])].map(record =>
              parseInt(record.id) === parseInt(action.record.id)
                ? {
                    listingId: record.listingId,
                    key: record.key,
                    ...action.record
                  }
                : record
            )
          : [
              {
                ...action.record,
                listingId: (state[action.record.formId] || []).length + 1,
                key: `recordValues${action.record.id}`
              },
              ...(state[action.record.formId] || [])
            ]
      }

    case "FETCH_VALUES":
      return action.values
    case "REMOVE_VALUES":
      return {
        ...state,
        [action.formId]: (state[action.formId] || []).filter(
          v => v.recordId !== action.recordId
        )
      }

    default:
      return state
  }
}

export const archivedValues = (state = {}, action) => {
  switch (action.type) {
    case "ADD_ARCHIVED_VALUES":
      return {
        ...state,
        [action.formId]: [...(state[action.formId] || []), { ...action.values }]
      }

    case "FETCH_ARCHIVED_VALUES":
      return action.values
    case "REMOVE_ARCHIVED_VALUES":
      return {
        ...state,
        [action.formId]: (state[action.formId] || []).filter(
          v => v.recordId !== action.recordId
        )
      }

    default:
      return state
  }
}
