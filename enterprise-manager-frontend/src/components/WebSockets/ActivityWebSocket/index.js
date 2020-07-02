import React, { useEffect } from "react"
import { useDispatch } from "react-redux"
import { fetchStories } from "../../../actions/storiesActions"
import cable from "../socket"

const ActivityWebSocket = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchStories())
    cable.subscriptions.create(
      {
        channel: "StoryChannel"
      },
      {
        received: data => {
          console.log(data)
          dispatch({
            type: "SET-STORIES",
            stories: data.stories
          })
        }
      }
    )
    // eslint-disable-next-line
  }, [])
  return <></>
}

export default ActivityWebSocket
