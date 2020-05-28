export const statistics = (state = {}, action) => {
  switch (action.type) {
    case "SET-STATISTICS":
      return {
        ...state,
        [action.formId]: { ...state[action.formId], ...action.payload }
      }
    default:
      return state
  }
}
