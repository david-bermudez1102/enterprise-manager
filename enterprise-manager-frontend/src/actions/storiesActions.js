import { getAll } from "./fetchActions"
import snakecaseKeys from "snakecase-keys"
import { message } from "antd"
import { handleErrors } from "./handleErrors"

export const fetchStories = () => dispatch =>
  getAll(dispatch, `/api/v1/stories`, stories =>
    dispatch({ type: "SET-STORIES", stories })
  )

export const updateStory = story => dispatch =>
  fetch(`/api/v1/stories/${story.id}`, {
    credentials: "include",
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(snakecaseKeys({ story }, { exclude: ["_destroy"] }))
  })
    .then(handleErrors)
    .catch(resp => message.error(resp.toString(), 8))
