import { handleErrors } from "./handleErrors"
import { remove, update, add } from "./fetchActions"

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

export const fetchResources = organizationId => {
  return dispatch => {
    return fetch(`/api/v1/organizations/${organizationId}/forms`, {
      credentials: "include",
      cache: "reload"
    })
      .then(handleErrors)
      .then(resources => dispatch({ type: "FETCH_RESOURCES", resources }))
      .catch(console.log)
  }
}

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
