export const OrganizationReducer = (state = [], action) => {
  switch (action.type) {
    case "ADD_ORGANIZATION":
      return [...state, action.organization]

    case "ADD_ORGANIZATIONS":
      return [...state, ...action.organizations]
    default:
      return state;
  }
}