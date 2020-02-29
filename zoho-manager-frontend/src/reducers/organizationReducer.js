export const organizationReducer = (state = [], action) => {
  switch (action.type) {
    case "ADD_ORGANIZATION":
      return [...state, action.organization];

    case "FETCH_ORGANIZATIONS":
      return [
        ...state,
        ...action.organizations.filter(organization =>
          !state.some(org => organization.id === org.id)
        )
      ];
    default:
      return state;
  }
};
