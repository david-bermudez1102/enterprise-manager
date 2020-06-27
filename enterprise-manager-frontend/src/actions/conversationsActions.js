import { remove, add, getAll } from "./fetchActions"
import { message } from "antd"
import snakecaseKeys from "snakecase-keys"
import { handleErrors } from "./handleErrors"

export const addConversation = conversation => dispatch =>
  add(
    dispatch,
    `/api/v1/conversations`,
    {
      conversation
    },
    conversation =>
      dispatch({
        type: "UPDATE-CONVERSATION-BY-KEY",
        conversation
      })
  )

export const fetchConversations = () => dispatch => {
  dispatch({ type: "REQUESTING_DATA" })
  return getAll(dispatch, `/api/v1/conversations`, conversations =>
    dispatch({ type: "SET-CONVERSATIONS", conversations })
  ).then(() => dispatch({ type: "FINISHED_REQUESTING" }))
}

export const removeConversation = conversation => dispatch =>
  remove(
    dispatch,
    `/api/v1/conversations/${conversation.id}`,
    conversation.id,
    { type: "DELETE-CONVERSATION", conversation }
  )

export const updateConversation = conversation => dispatch =>
  fetch(`/api/v1/conversations/${conversation.id}`, {
    credentials: "include",
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(
      snakecaseKeys({ conversation }, { exclude: ["_destroy"] })
    )
  })
    .then(handleErrors)
    .then(conversation => {
      if (!conversation.errors) {
        dispatch({
          type: "UPDATE-CONVERSATION",
          conversation
        })
      } else {
        throw new Error(conversation.errors.join(", "))
      }
      return conversation
    })
    .catch(resp => {
      console.log(resp.toString())
      return false
    })

export const messagePreview = conversation => async dispatch =>
  await dispatch({ type: "UPDATE-CONVERSATION-BY-KEY", conversation })
