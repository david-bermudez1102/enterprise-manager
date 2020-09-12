import React, { useEffect } from "react"
import { shallowEqual, useDispatch, useSelector } from "react-redux"
import cable from "../socket"
import { fetchConversations } from "../../../actions/conversationsActions"

const ConversationWebSocket = props => {
	const dispatch = useDispatch()
	const { conversations } = useSelector(
		({ conversations }) => ({ conversations }),
		shallowEqual
	)

	useEffect(() => {
		dispatch(fetchConversations())
		cable.subscriptions.create(
			{
				channel: "ConversationChannel"
			},
			{
				received: data => {
					dispatch({
						type: "SET-CONVERSATIONS",
						conversations: data.conversations
					})
				}
			}
		)
		// eslint-disable-next-line
	}, [conversations.length])
	return <></>
}

export default ConversationWebSocket
