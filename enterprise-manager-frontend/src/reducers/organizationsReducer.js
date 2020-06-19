export const organizationsReducer = (state = [], action) => {
  switch (action.type) {
    case "ADD_ORGANIZATION":
      return [...state, action.organization]

    case "FETCH_ORGANIZATIONS":
      return [
        ...state,
        ...action.organizations.filter(
          organization =>
            !state.some(org => parseInt(organization.id) === parseInt(org.id))
        )
      ]
    case "UPDATE_ORGANIZATION":
      return [...state].map(organization =>
        organization.id === action.organization.id
          ? { ...organization, ...action.organization }
          : organization
      )
    default:
      return state
  }
}
