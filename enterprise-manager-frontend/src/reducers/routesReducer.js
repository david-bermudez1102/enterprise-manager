export const routes = (state = [], action) => {
  switch (action.type) {
    case "ADD_ROUTE":
      return [
        {
          path: action.path,
          name: action.name,
          title: action.title,
          exact: action.exact
        },
        ...state.filter(route => route.path !== action.path)
      ]
    case "UPDATE_ROUTE":
      return [
        {
          path: action.path,
          name: action.name,
          title: action.title,
          exact: action.exact
        },
        ...state.filter(route => route.path !== action.path)
      ]
    default:
      return state
  }
}
