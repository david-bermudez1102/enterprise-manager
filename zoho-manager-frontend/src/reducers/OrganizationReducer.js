export const OrganizationReducer = (state = {logo:"", name:""}, action) => {
  switch (action.type) {
    case 'ADD_ORGANIZATION':
      console.log(action.organization)
      return action.organization
    default:
      return state
  }
}