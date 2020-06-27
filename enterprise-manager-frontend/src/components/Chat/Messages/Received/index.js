import React from "react"
import defaultUser from "../../../../default_user.png"
import { Comment, Avatar, Skeleton } from "antd"
import { useSelector, shallowEqual } from "react-redux"

const MessageReceived = ({ content, account, style }) => {
  const { requesting } = useSelector(
    ({ requesting }) => ({ requesting }),
    shallowEqual
  )
  return (
    <Skeleton loading={requesting} active avatar paragraph={1}>
      <Comment
        style={style}
        className={"message-received"}
        avatar={
          <Avatar src={account.avatarSrc || defaultUser} alt='Han Solo' />
        }
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
    </Skeleton>
  )
}

export default React.memo(MessageReceived)
