import React from "react"
import { Comment, Avatar, Button, Tooltip, Skeleton } from "antd"
import { blue } from "@ant-design/colors"
import defaultUser from "../../../../default_user.png"
import { ExclamationCircleOutlined } from "@ant-design/icons"
import { useSelector, shallowEqual } from "react-redux"

const MessageSent = ({ content, avatarSrc, sent, status, id }) => {
  const { requesting } = useSelector(
    ({ requesting }) => ({ requesting }),
    shallowEqual
  )

  return (
    <Skeleton loading={requesting} active avatar paragraph={1}>
      <Comment
        className={"message-sent"}
        avatar={<Avatar src={avatarSrc || defaultUser} alt='Han Solo' />}
        content={
          <>
            {status === 0 ? (
              <Tooltip
                destroyTooltipOnHide
                title={
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      flexWrap: "nowrap"
                    }}>
                    Message not delivered.
                    <Button type={"link"}>Try again</Button>
                  </div>
                }
                trigger={"click"}>
                <Button type={"link"} danger>
                  <ExclamationCircleOutlined />
                </Button>
              </Tooltip>
            ) : null}
            <p
              className={
                sent ? "speech-bubble-sent" : "speech-bubble-undelivered"
              }
              style={{
                width: "auto",
                background: sent ? blue.primary : blue[2],
                color: "#fff",
                padding: 10,
                borderRadius: 5,
                display: "inline-block",
                textAlign: "left",
                maxWidth: "100%"
              }}>
              {content}
            </p>
          </>
        }
      />
    </Skeleton>
  )
}

export default React.memo(MessageSent, shallowEqual)
