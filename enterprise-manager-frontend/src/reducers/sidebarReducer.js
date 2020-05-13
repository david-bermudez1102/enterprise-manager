export const sidebar = (state = { collapsed: false }, action) => {
  switch (action.type) {
    case "SET-COLLAPSED":
      return { ...state, collapsed: action.collapsed };
    default:
      return state;
  }
};
