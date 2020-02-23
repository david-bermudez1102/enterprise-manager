export const OrganizationReducer = (state = { organization:[] }, action) => {
  switch (action.type) {
    case 'ADD_ORGANIZATION':
      console.log({
        ...state,
        organization: [...state.organization, action.organization]
      });
      return { ...state, organization:[...state.organization, action.organization]}
    default:
      return state
  }
}