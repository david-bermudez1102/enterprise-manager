export const routes = (state = [], action) => {
  switch (action.type) {
    case "ADD_ROUTE":
      return [
        ...state.filter(route => route.path !== action.path),
        { path: action.path, name: action.name, title: action.title },
      ];
    case "UPDATE_ROUTE":
      return [
        ...state.map(route =>
          route.path === action.path
            ? { path: action.path, name: action.name, title: action.title }
            : route
        ),
      ];
    default:
      return state;
  }
};
