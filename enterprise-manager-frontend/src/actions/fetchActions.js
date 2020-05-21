import { handleErrors } from "./handleErrors"
import snakecaseKeys from "snakecase-keys"
import { message } from "antd"

const SUCCESS_MESSAGE_DEFAULT = "Content was created with success"
const UPDATED_MESSAGE_DEFAULT = "Content was saved with success"
const SOFT_DELETED_MESSAGE_DEFAULT = "Content was sent to deleted folder"
const DESTROYED_MESSAGE_DEFAULT = "Content was deleted with success"

export const add = (dispatch, url, payload, ...actions) => {
	return fetch(url, {
		credentials: "include",
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(snakecaseKeys(payload))
	})
		.then(handleErrors)
		.then(response => response.json())
		.then(response => {
			if (!response.errors) {
				actions.map(action => dispatch(action))
				message.success(response.message || SUCCESS_MESSAGE_DEFAULT)
				return response
			} else {
				throw new Error(response.errors.join(", "))
			}
		})
		.catch(resp => message.error(resp.toString()))
}

export const update = (dispatch, url, payload, ...actions) => {
	return fetch(url, {
		credentials: "include",
		method: "PATCH",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(snakecaseKeys(payload))
	})
		.then(handleErrors)
		.then(response => response.json())
		.then(response => {
			if (!response.errors) {
				actions.map(action => dispatch(action))
				message.success(response.message || UPDATED_MESSAGE_DEFAULT)
			} else {
				throw new Error(response.errors.join(", "))
			}
		})
		.catch(resp => message.error(resp.toString()))
}

export const remove = (dispatch, url, id, type, ...actions) => {
	return fetch(url, {
		method: "DELETE"
	})
		.then(handleErrors)
		.then(response => response.json())
		.then(response => {
			if (response.destroyed) {
				actions.forEach(act => dispatch(act))
				message.success(response.message || DESTROYED_MESSAGE_DEFAULT)
				return response
			} else if (response.archived) {
				actions.forEach(act => dispatch(act))
				message.success(response.message || SOFT_DELETED_MESSAGE_DEFAULT)
				return response
			} else {
				throw new Error(response.errors.join(", "))
			}
		})
		.catch(resp => message.error(resp.toString()))
}
