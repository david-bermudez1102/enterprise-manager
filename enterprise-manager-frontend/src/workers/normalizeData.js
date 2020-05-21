export const normalize = (state, payload, formId) => {
  return {
    ...state,
    [formId]: [
      ...(state[formId] || [])
        .filter(prevPayload => payload.some(p => p.id === prevPayload.id))
        .map(prevPayload => {
          const updatedPayload = payload.find(p => prevPayload.id === p.id)
          if (updatedPayload) return updatedPayload
          return prevPayload
        }),
      ...payload.filter(
        newPayload =>
          !(state[formId] || []).some(
            prevPayload => prevPayload.id === newPayload.id
          )
      )
    ]
  }
}

export const normalizeWithFilters = (state, payload, formId) => {
  return {
    ...state,
    [formId]: [
      ...(state[formId] || []).filter(
        prevPayload => !payload.some(p => p.id === prevPayload.id)
      ),
      ...payload
    ]
  }
}
