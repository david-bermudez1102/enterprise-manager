import camelCase from "camelcase"
import { plural } from "pluralize"

export const actionsGenerator = ({ name, index, ...props }) => (
  state = [],
  action
) => {
  const uppercaseName = name.toUpperCase()
  const camelCasedName = camelCase(name)
  const pluralName = plural(name)

  switch (action.type) {
    case `ADD-${uppercaseName}`:
      return [...state, action[camelCasedName]]
    case `UPDATE-${uppercaseName}`:
      return props[`UPDATE-${uppercaseName}`]
        ? props[`UPDATE-${uppercaseName}`](state, action)
        : [...state].map(payload =>
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
      return props[`SET-${plural(uppercaseName)}`]
        ? props[`SET-${plural(uppercaseName)}`](state, action)
        : action[pluralName]

    case `RESET`:
      return []
    default:
      return state
  }
}
