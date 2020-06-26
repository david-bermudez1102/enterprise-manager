import camelCase from "camelcase"
import { plural } from "pluralize"

export const actionsGenerator = (name, index) => (state = [], action) => {
  const uppercaseName = name.toUpperCase()
  const camelCasedName = camelCase(name)
  const pluralName = plural(name)

  switch (action.type) {
    case `ADD-${uppercaseName}`:
      return [...state, action[camelCasedName]]
    case `UPDATE-${uppercaseName}`:
      return [...state].map(payload =>
        payload[index] === action[camelCasedName][index]
          ? action[camelCasedName]
          : payload
      )
    case `UPDATE-${uppercaseName}-BY-KEY`:
      return [...state].map(payload =>
        payload.key === action[camelCasedName].key
          ? { ...payload, ...action[camelCasedName] }
          : payload
      )
    case `SET-${plural(uppercaseName)}`:
      return action[pluralName]
    default:
      return state
  }
}
