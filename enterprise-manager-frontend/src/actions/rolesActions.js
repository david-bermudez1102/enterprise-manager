import { remove, update, add, getAll } from "./fetchActions"

export const addRole = role => dispatch =>
  add(dispatch, `/api/v1/organizations/${role.organizationId}/roles`, {
    role
  }).then(role => {
    dispatch({
      type: "ADD-ROLE",
      role
    })
  })

export const fetchRoles = organizationId => dispatch =>
  getAll(
    dispatch,
    `/api/v1/organizations/${organizationId}/roles`
  ).then(roles => dispatch({ type: "SET-ROLES", roles }))

export const removeRole = role => dispatch =>
  remove(
    dispatch,
    `/api/v1/organizations/${role.organizationId}/roles/${role.id}`,
    role.id,
    { type: "DELETE-ROLE", role }
  )

export const updateRole = role => dispatch =>
  update(
    dispatch,
    `/api/v1/organizations/${role.organizationId}/roles/${role.id}`,
    { role }
  ).then(resp =>
    dispatch({
      type: "UPDATE-ROLE",
      role: resp
    })
  )
