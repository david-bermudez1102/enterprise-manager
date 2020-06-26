import React from "react"
import { Comment, Avatar } from "antd"
import { blue } from "@ant-design/colors"
import defaultUser from "../../../../default_user.png"

const MessageSent = ({ content, account, avatarSrc, style }) => {
  return (
    <Comment
      style={style}
      className={"message-sent"}
      avatar={<Avatar src={avatarSrc || defaultUser} alt='Han Solo' />}
      content={
        <p
          className={"speech-bubble-sent"}
          style={{
            width: "auto",
            background: blue[4],
            color: "#fff",
            padding: 10,
            borderRadius: 5,
            display: "inline-block",
            textAlign: "left",
            maxWidth: "100%"
          }}>
          {content}
        </p>
      }
    />
  )
}

export default MessageSent
