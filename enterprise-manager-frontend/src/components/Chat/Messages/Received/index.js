import React from "react"
import defaultUser from "../../../../default_user.png"
import { Comment, Avatar } from "antd"

const MessageReceived = ({ content, account, style }) => {
  return (
    <Comment
      style={style}
      className={"message-received"}
      avatar={<Avatar src={account.avatarSrc || defaultUser} alt='Han Solo' />}
      content={
        <p
          className={"speech-bubble-received"}
          style={{
            background: "rgba(150, 150, 150, 0.1)",
            width: "auto",
            padding: 10,
            borderRadius: 5,
            display: "inline-block",
            maxWidth: "100%"
          }}>
          {content}
        </p>
      }
    />
  )
}

export default MessageReceived
