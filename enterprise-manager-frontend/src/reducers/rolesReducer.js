export const roles = (state = [], action) => {
  switch (action.type) {
    case "SET-ROLES":
      return action.roles
    case "ADD-ROLE":
      return [...state, action.role]
    case "UPDATE-ROLE":
      return [...state].map(role =>
        role.id === action.role.id ? action.role : role
      )
    case "DELETE-ROLE":
      return [...state].filter(role => role.id !== action.role.id)
    default:
      return state
  }
}
