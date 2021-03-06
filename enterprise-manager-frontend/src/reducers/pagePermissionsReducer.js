export const pagePermissions = (state = {}, action) => {
  switch (action.type) {
    case "ADD_PAGE_PERMISSION":
      return {
        ...state,
        [action.pagePermission.pageName]: action.pagePermission
      }
    case "UPDATE_PAGE_PERMISSION":
      return {
        ...state,
        [action.pagePermission.pageName]: action.pagePermission
      }
    case "SET_PAGE_PERMISSIONS":
      return {
        ...action.pagePermissions.reduce((p, obj) => {
          p[obj.pageName] = obj
          return p
        }, {})
      }
    default:
      return state
  }
}
