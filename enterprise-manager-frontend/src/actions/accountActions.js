import snakecaseKeys from "snakecase-keys"
import { handleErrors } from "./handleErrors"
import { message } from "antd"
import { getAll, add } from "./fetchActions"
import jsonToFormData from "json-form-data"

export const addAccount = account => dispatch =>
  add(
    dispatch,
    `/api/v1/organizations/${account.organizationId}/accounts`,
    { account },
    account => dispatch({ type: "ADD_ACCOUNT", account })
  )

export const updateAccount = account => dispatch =>
  fetch(
    `/api/v1/organizations/${account.organizationId}/accounts/${account.id}`,
    {
      method: "PATCH",
      body: jsonToFormData(
        snakecaseKeys({ account }, { exclude: ["avatar", "_destroy"] }),
        { showLeafArrayIndexes: false }
      )
    }
  )
    .then(handleErrors)
    .then(account => {
      dispatch({
        type: "UPDATE_ACCOUNT",
        account
      })
      message.success("Information saved with success.", 10)
    })
    .catch(resp => message.error(resp.toString(), 15))

export const fetchAccounts = organizationId => dispatch =>
  getAll(
    dispatch,
    `/api/v1/organizations/${organizationId}/accounts/`,
    accounts => dispatch({ type: "SET-ACCOUNTS", accounts })
  )

export const removeAccount = accountId => {
  return dispatch => {
    dispatch({ type: "CLEAR_ALERTS" })
    return fetch(`/api/v1/accounts/${accountId}`, {
      method: "DELETE"
    })
      .then(response => response.json())
      .then(account => {
        if (!account.errors) {
          dispatch({
            type: "ADD_MESSAGES",
            messages: account.messages || ["Account was deleted with success."]
          })
          return dispatch({
            type: "REMOVE_ACCOUNT",
            accountId
          })
        } else {
          dispatch({ type: "ADD_ERRORS", errors: account.errors })
        }
      })
      .catch(console.log)
  }
}

export const resetPassword = (token, activation) => {
  return dispatch => {
    dispatch({ type: "CLEAR_ALERTS" })
    return fetch(`/api/v1/account_unlock/${token}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(snakecaseKeys({ activation }))
    })
      .then(handleErrors)
      .then(response => response.json())
      .then(response => {
        if (!response.errors) {
          dispatch({
            type: "REMOVE_TOKEN"
          })
          dispatch({
            type: "ADD_MESSAGES",
            messages: response.messages
          })
          return "success"
        } else {
          dispatch({ type: "ADD_ERRORS", errors: response.errors })
        }
      })
      .catch(console.log)
  }
}

/* export const accountAction = (method, action, data) => {
  return dispatch => {
    fetch(`/api/v1/accounts/${accountId}`, {
      method,
      headers: {
        "Content-Type": "application/json"
      },
      body: data ? JSON.stringify(data) : undefined
    })
      .then(resp => resp.json())
      .then(resp => resp.data.map(manager => manager.attributes))
      .then(managers => dispatch({ type: action, managers }));
  };
}; */
