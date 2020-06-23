import React, { useEffect } from "react"
import { useDispatch } from "react-redux"
import cable from "../socket"
import { fetchSession } from "../../../actions/sessionActions"

const SessionWebSocket = props => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchSession())
    cable.subscriptions.create(
      {
        channel: "SessionChannel"
      },
      {
        received: updatedSession => {
          console.log(updatedSession)
          !updatedSession.errors
            ? dispatch({
                type: "ADD_SESSION",
                isLoggedIn: true,
                currentUser: updatedSession.data.attributes
              })
            : dispatch({
                type: "REMOVE_SESSION"
              })
        }
      }
    )
  }, [])
  return <></>
}

export default SessionWebSocket
