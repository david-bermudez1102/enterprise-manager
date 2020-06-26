import React from "react"
import { MessageOutlined } from "@ant-design/icons"
import { Button, Avatar, Tooltip } from "antd"
import { parseFullName } from "parse-full-name"
import SyncLoader from "react-spinners/SyncLoader"
import Text from "antd/lib/typography/Text"
import defaultUser from "../../../default_user.png"

const UserTyping = ({ conversation, session }) => {
  const usersTyping = conversation.typingConversations.filter(
    t => t.isTyping && t.accountId !== session.currentUser.id
  )

  const usersAvatar = usersTyping.filter(t => t.avatarSrc)

  const userNames = usersTyping
    .map(t => parseFullName(t.name))
    .map(t => `${t.first} ${t.last.charAt(0)}.`)

  return usersTyping.length > 0 ? (
    <Tooltip
      title={
        usersTyping.length <= 2
          ? usersTyping.length === 1
            ? `${userNames[0]} is typing...`
            : `${userNames.join(", ")} are typing...`
          : `${userNames.slice(-2).join(", ")} and ${
              usersTyping.length - 2
            } more
          are typing...`
      }>
      <Button type={"text"} style={{ padding: 0 }}>
        <Text
          style={{
            display: "flex",
            flexWrap: "nowrap",
            alignItems: "center",
            height: "100%"
          }}
          type={"secondary"}>
          <Avatar
            src={
              usersAvatar.length > 0 ? usersAvatar[0].avatarSrc : defaultUser
            }
            style={{ marginRight: 12 }}
          />
          <SyncLoader size={10} color={"rgba(0,0,0,0.1)"} />
        </Text>
      </Button>
    </Tooltip>
  ) : null
}

export default UserTyping
