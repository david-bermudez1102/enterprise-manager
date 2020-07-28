export const normalize = (state, payload, formId) => {
  return {
    ...state,
    [formId]: payload
  }
}

export const normalizeWithFilters = (state, payload, formId) => {
  return {
    ...state,
    [formId]: payload
  }
}
