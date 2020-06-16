import { handleErrors } from "./handleErrors"
import { message } from "antd"

export const addSession = data => {
  return dispatch => {
    dispatch({ type: "CLEAR_ALERTS" })
    const configObj = {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(data)
    }
    return fetch("/api/v1/sessions", configObj)
      .then(handleErrors)
      .then(account => {
        if (account.token) return account
        else if (!account.errors) {
          dispatch({
            type: "ADD_SESSION",
            isLoggedIn: true,
            currentUser: account.data.attributes
          })
          return account
        } else {
          account.errors.map(err => message.error(err))
          return account
        }
      })
      .catch(console.log)
  }
}

export const fetchSession = () => {
  return (dispatch, getState) => {
    return fetch("/api/v1/current_user", {
      credentials: "include"
    })
      .then(handleErrors)
      .then(account =>
        !account.errors
          ? dispatch({
              type: "ADD_SESSION",
              isLoggedIn: true,
              currentUser: account.data.attributes
            })
          : getState().session.isLoggedIn
          ? dispatch({
              type: "REMOVE_SESSION"
            })
          : null
      )
      .catch(console.log)
  }
}

export const removeSession = () => {
  return dispatch => {
    return fetch("api/v1/delete_session", {
      method: "DELETE",
      credentials: "include"
    })
      .then(handleErrors)
      .then(data => data)
      .catch(console.log)
  }
}
