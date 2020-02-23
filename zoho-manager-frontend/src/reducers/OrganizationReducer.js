export const OrganizationReducer = (state = {logo:"", name:""}, action) => {
  switch (action.type) {
    case 'ADD_ORGANIZATION':
      return action.organization
    default:
      return state
  }
}