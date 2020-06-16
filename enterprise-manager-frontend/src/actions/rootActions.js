import jsonToFormData from "json-form-data"
import camelcaseKeys from "camelcase-keys"
import { update, add, getAll } from "./fetchActions"

export const addRoot = root => dispatch =>
  add(
    dispatch,
    `/api/v1/organizations/${root.organizationId}/roots`,
    {
      root
    },
    root =>
      dispatch({
        type: "ADD_ROOT",
        root
      })
  )

export const updateRoot = root => dispatch =>
  update(
    dispatch,
    `/api/v1/organizations/${root.organizationId}/roots/${root.id}`,
    {
      root
    }
  ).then(root => {
    dispatch({
      type: "UPDATE_ROOT",
      root
    })
    dispatch({
      type: "UPDATE_SESSION",
      currentUser: root
    })
  })

export const updateRoots = (root, rootId) => {
  return dispatch => {
    dispatch({ type: "CLEAR_ALERTS" })
    fetch(`/api/v1/roots/${rootId}`, {
      credentials: "include",
      method: "PATCH",
      body: jsonToFormData({ root })
    })
      .then(response => response.json())
      .then(root => {
        if (!root.errors) {
          dispatch({
            type: "UPDATE_ADMIN",
            root: camelcaseKeys(root.data.attributes),
            rootId
          })
          dispatch({
            type: "UPDATE_SESSION",
            currentUser: camelcaseKeys(root.data.attributes)
          })
          dispatch({
            type: "ADD_MESSAGES",
            messages: root.messages || ["Profile updated successfully."]
          })
        } else {
          dispatch({ type: "ADD_ERRORS", errors: root.errors })
        }
      })
      .catch(console.log)
  }
}

export const fetchRoots = organizationId => dispatch =>
  getAll(dispatch, `/api/v1/organizations/${organizationId}/roots`, roots =>
    dispatch({ type: "ADD_ROOTS", roots })
  )
