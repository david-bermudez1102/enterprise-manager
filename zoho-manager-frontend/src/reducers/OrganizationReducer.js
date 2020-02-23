export const OrganizationReducer = (state = { organizations:[] }, action) => {
  switch (action.type) {
    case "ADD_ORGANIZATION":
      console.log({
        ...state,
        organizations: [...state.organizations, action.organization]
      });
      return {
        ...state,
        organizations: [...state.organizations, action.organization]
      };

    case "ADD_ORGANIZATIONS":
      console.log({
        ...state,
        organizations: [...state.organizations, ...action.organizations]
      });
      return {
        ...state,
        organizations: [...state.organizations, ...action.organizations]
      };
    default:
      return state;
  }
}