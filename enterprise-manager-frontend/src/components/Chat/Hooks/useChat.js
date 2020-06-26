import { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import { updateConversation } from "../../../actions/conversationsActions"

const useChat = props => {
  const [minimized, setMinimized] = useState(props.isMinimized)
  const [isOpen, setIsOpen] = useState(props.isOpen)
  const dispatch = useDispatch()

  useEffect(() => {
    setIsOpen(props.isOpen)
  }, [props.isOpen])

  useEffect(() => {
    setMinimized(props.isMinimized)
  }, [props.isMinimized])

  const handleMinimized = minimized => {
    if (props.conversation.id)
      dispatch(
        updateConversation({
          id: props.conversation.id,
          minimizedConversationsAttributes: [
            { id: props.conversation.minimizedId, isMinimized: minimized }
          ]
        })
      )
    setMinimized(minimized)
  }

  const handleIsOpen = isOpen => {
    if (props.conversation.id)
      dispatch(
        updateConversation({
          id: props.conversation.id,
          openConversationsAttributes: [
            { id: props.conversation.openConversationId, isOpen }
          ]
        })
      )
    setIsOpen(isOpen)
  }

  return { handleMinimized, minimized, isOpen, handleIsOpen }
}

export default useChat
