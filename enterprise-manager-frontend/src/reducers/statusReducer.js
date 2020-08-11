export const statusReducer = (state = { isSaving: false }, action) => {
  switch (action.type) {
    case "IS_SAVING":
      return { ...state, isSaving: true }
    case "FINISHED_SAVING":
      return { ...state, isSaving: false }
    default:
      return state
  }
}
