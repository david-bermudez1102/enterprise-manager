export const theme = (state = { color: "light" }, action) => {
  switch (action.type) {
    case "SET-THEME":
      return {
        ...state,
        color: action.color
      }
    default:
      return state
  }
}
