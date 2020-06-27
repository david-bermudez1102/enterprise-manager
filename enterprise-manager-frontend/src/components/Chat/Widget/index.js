import React from "react"
import { Button, Badge } from "antd"
import IconWrapper from "../../Icons/IconWrapper"
import { useSelector, shallowEqual } from "react-redux"

const ChatWidget = ({ isWidgetOpen, setIsWidgetOpen, messages }) => {
  const { session } = useSelector(({ session }) => ({ session }), shallowEqual)
  const unreadMessages = messages.filter(
    message => message.account.id !== session.currentUser.id && !message.isRead
  )

  return (
    <Badge count={!isWidgetOpen ? unreadMessages.length : 0} offset={[-50, 5]}>
      <Button
        className={"chat-button"}
        onClick={() => setIsWidgetOpen(!isWidgetOpen)}
        shape={"circle"}
        type={"primary"}
        size={"large"}
        style={{
          width: 70,
          height: 70,
          float: "right",
          pointerEvents: "auto"
        }}>
        <IconWrapper className='fas fa-comment' style={{ fontSize: "25px" }} />
      </Button>
    </Badge>
  )
}

export default ChatWidget
