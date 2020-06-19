import { getAll, update, add } from "./fetchActions"

export const addPagePermission = pagePermission => dispatch =>
  add(
    dispatch,
    `/api/v1/organizations/${pagePermission.organizationId}/page_permissions`,
    { pagePermission },
    pagePermission => dispatch({ type: "ADD_PAGE_PERMISSION", pagePermission })
  )

export const updatePagePermission = pagePermission => dispatch =>
  update(
    dispatch,
    `/api/v1/organizations/${pagePermission.organizationId}/page_permissions/${pagePermission.id}`,
    { pagePermission },
    pagePermission =>
      dispatch({ type: "UPDATE_PAGE_PERMISSION", pagePermission })
  )

export const fetchPagePermissions = organizationId => dispatch =>
  getAll(
    dispatch,
    `/api/v1/organizations/${organizationId}/page_permissions`,
    pagePermissions =>
      dispatch({ type: "SET_PAGE_PERMISSIONS", pagePermissions })
  )
