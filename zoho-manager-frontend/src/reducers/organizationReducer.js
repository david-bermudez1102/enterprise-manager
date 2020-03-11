export const organizationReducer = (state = [], action) => {
  switch (action.type) {
    case "ADD_ORGANIZATION":
      return [...state, action.organization];

    case "FETCH_ORGANIZATIONS":
      return [
        ...state,
        ...action.organizations.filter(
          organization => !state.some(org => organization.id === org.id)
        )
      ];
    case "UPDATE_ORGANIZATION":
      const organization = state.find(
        organization => organization.id === parseInt(action.organizationId)
      );
      return [...state].map(org =>
        org.id === organization.id ? organization : org
      );
    default:
      return state;
  }
};
