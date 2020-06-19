import capitalize from "capitalize"
import camelCase from "camelcase"

export const actionsGenerator = name => (state = {}, action) => {
  const capitalizedName = capitalize(name)
  const snakeCasedName = camelCase(name)
  switch (action.type) {
    case `ADD_${capitalizedName}`:
      return { ...state, [action.pagePermission.name]: action.pagePermission }
    case `ADD_${capitalizedName}`:
      return { ...state, [action.pagePermission.name]: action.pagePermission }
    default:
      return state
  }
}
