export const sidebar = (
  state = { minimized: false, minimizedFromToggle: false },
  action
) => {
  switch (action.type) {
    case "SET-MINIMIZED":
      return { ...state, minimized: action.minimized };
    case "SET-MINIMIZEDFROMTOGGLE":
      return { ...state, minimizedFromToggle: action.minimizedFromToggle };
    default:
      return state;
  }
};
