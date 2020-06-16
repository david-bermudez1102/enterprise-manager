export const roots = (state = [], action) => {
  switch (action.type) {
    case "ADD_ROOT":
      return [...state, action.root]
    case "ADD_ROOTS":
      return action.roots
    case "UPDATE_ROOT":
      const root = state.find(root => root.id === parseInt(action.rootId))
      return [...state.map(a => (a.id === root.id ? action.root : a))]
    default:
      return state
  }
}
