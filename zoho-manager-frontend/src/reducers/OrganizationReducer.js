export const OrganizationReducer = (state = { organizations:[] }, action) => {
  switch (action.type) {
    case "ADD_ORGANIZATION":
      return {
        ...state,
        organizations: [...state.organizations, action.organization]
      };

    case "ADD_ORGANIZATIONS":
      return {
        ...state,
        organizations: [...state.organizations, ...action.organizations]
      };
    default:
      return state;
  }
}