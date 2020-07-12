import { remove, update, add, getAll } from "./fetchActions"

export const addResource = resource => dispatch =>
  add(
    dispatch,
    `/api/v1/organizations/${resource.organizationId}/forms`,
    { form: resource },
    resource =>
      dispatch({
        type: "ADD_RESOURCE",
        resource
      })
  )

export const fetchResources = organizationId => dispatch =>
  getAll(dispatch, `/api/v1/organizations/${organizationId}/forms`, resources =>
    dispatch({ type: "FETCH_RESOURCES", resources })
  )

export const updateResource = resource => {
  return dispatch =>
    update(
      dispatch,
      `/api/v1/organizations/${resource.organizationId}/forms/${resource.id}`,
      { form: resource }
    ).then(resource => {
      dispatch({ type: "UPDATE_RESOURCE", resource })
      return resource
    })
}

export const sortFields = resource => dispatch =>
  update(
    dispatch,
    `/api/v1/organizations/${resource.organizationId}/forms/${resource.id}/sort`,
    { form: resource },
    resource => {
      dispatch({ type: "UPDATE_RESOURCE", resource })
      return resource
    }
  )

export const removeResource = (organizationId, id) => {
  return dispatch => {
    return remove(
      dispatch,
      `/api/v1/organizations/${organizationId}/forms/${id}`,
      id,
      "REMOVE_RESOURCE",
      {
        type: "REMOVE_RECORDS",
        resourceId: id
      }
    )
  }
}
