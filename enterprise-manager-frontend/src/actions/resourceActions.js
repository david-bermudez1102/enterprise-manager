import { remove, update, add, getAll } from "./fetchActions"
import { handleErrors } from "./handleErrors"
import snakecaseKeys from "snakecase-keys"

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
  fetch(
    `/api/v1/organizations/${resource.organizationId}/forms/${resource.id}/sort`,
    {
      credentials: "include",
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(
        snakecaseKeys({ form: resource }, { exclude: ["_destroy"] })
      )
    }
  )
    .then(handleErrors)
    .then(resource => {
      dispatch({ type: "UPDATE_RESOURCE", resource })
      return resource
    })

export const removeResource = (organizationId, id) => {
  return dispatch => {
    return remove(
      `/api/v1/organizations/${organizationId}/forms/${id}`,
      id,
      "REMOVE_RESOURCE",
      () =>
        dispatch({
          type: "REMOVE_RECORDS",
          resourceId: id
        })
    )
  }
}
