import React, { useEffect } from "react"
import { useDispatch } from "react-redux"
import cable from "../socket"
import { fetchConversations } from "../../../actions/conversationsActions"

const ConversationWebSocket = props => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchConversations())
    cable.subscriptions.create(
      {
        channel: "ConversationChannel",
        account_id: 14
      },
      {
        received: data => {
          console.log(data)
          dispatch({
            type: "SET-CONVERSATIONS",
            conversations: data.conversations
          })
        }
      }
    )
    // eslint-disable-next-line
  }, [])
  return <></>
}

export default ConversationWebSocket
