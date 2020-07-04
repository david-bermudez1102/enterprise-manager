import { handleErrors } from "./handleErrors"
import snakecaseKeys from "snakecase-keys"
import { message } from "antd"

const SUCCESS_MESSAGE_DEFAULT = "Content was created with success"
const UPDATED_MESSAGE_DEFAULT = "Content was saved with success"
const SOFT_DELETED_MESSAGE_DEFAULT = "Content was sent to deleted folder"
const DESTROYED_MESSAGE_DEFAULT = "Content was deleted with success"

export const getAll = (dispatch, url, ...actions) =>
  fetch(url, {
    cache: "no-cache",
    credentials: "include",
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(handleErrors)
    .then(response => {
      if (!response.errors) {
        actions.map(action => action(response))
        return response
      } else {
        throw new Error(response.errors.join(", "))
      }
    })
    .catch(resp => {
      actions.map(action => action([]))
      message.error(resp.toString(), 8)
    })

export const add = (dispatch, url, payload, ...actions) => {
  return fetch(url, {
    cache: "no-cache",
    credentials: "include",
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(snakecaseKeys(payload, { exclude: ["_destroy"] }))
  })
    .then(handleErrors)
    .then(response => {
      if (!response.errors) {
        actions.map(action => action(response))
        message.success(response.message || SUCCESS_MESSAGE_DEFAULT, 10)
        return response
      } else {
        throw new Error(response.errors.join(", "))
      }
    })
    .catch(resp => {
      message.error(resp.toString(), 15)
      return false
    })
}

export const update = (dispatch, url, payload, ...actions) => {
  return fetch(url, {
    credentials: "include",
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(snakecaseKeys(payload, { exclude: ["_destroy"] }))
  })
    .then(handleErrors)
    .then(response => {
      console.log(response)
      if (!response.errors) {
        actions.map(action => action(response))
        message.success(response.message || UPDATED_MESSAGE_DEFAULT)
      } else {
        throw new Error(response.errors.join(", "))
      }
      return response
    })
    .catch(resp => message.error(resp.toString()))
}

export const remove = (dispatch, url, id, type, ...actions) => {
  return fetch(url, {
    method: "DELETE"
  })
    .then(handleErrors)
    .then(response => {
      if (response.destroyed) {
        actions.forEach(act => act(response))
        message.success(response.message || DESTROYED_MESSAGE_DEFAULT)
        return response
      } else if (response.archived) {
        actions.forEach(act => act(response))
        message.success(response.message || SOFT_DELETED_MESSAGE_DEFAULT)
        return response
      } else {
        throw new Error(response.errors.join(", "))
      }
    })
    .catch(resp => message.error(resp.toString()))
}
