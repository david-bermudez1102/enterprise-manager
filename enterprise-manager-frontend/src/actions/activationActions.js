import { getAll, update } from "./fetchActions"

export const verifyToken = token => dispatch =>
  getAll(dispatch, `/api/v1/activations/${token}`)

export const activate = (token, activation) => dispatch =>
  update(dispatch, `/api/v1/activations/${token}`, { activation }, () =>
    dispatch({
      type: "REMOVE_TOKEN"
    })
  )
