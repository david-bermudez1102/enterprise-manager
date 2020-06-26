import React from "react"
import { Affix, Button, Row, Col, Menu, Avatar, Tooltip, Badge } from "antd"
import IconWrapper from "../Icons/IconWrapper"
import "./styles.scss"
import Conversation from "./Conversation"
import { useSelector, shallowEqual, useDispatch } from "react-redux"
import defaultUser from "../../default_user.png"
import { updateConversation } from "../../actions/conversationsActions"
import cuid from "cuid"

const Chat = props => {
  const { conversations, accounts, session } = useSelector(
    ({ conversations, accounts, session }) => ({
      conversations,
      accounts,
      session
    }),
    shallowEqual
  )

  const dispatch = useDispatch()

  return (
    <Affix
      style={{
        pointerEvents: "none",
        zIndex: 2,
        position: "fixed",
        bottom: 0,
        right: 0,
        width: "100%",
        padding: 16
      }}>
      <Row justify={"end"} gutter={24} align={"bottom"}>
        {conversations.map(conversation => (
          <Col
            xs={15}
            sm={12}
            md={10}
            lg={8}
            xl={6}
            xxl={5}
            style={{ top: 15 }}
            key={`conversation_window_${conversation.key22}`}>
            <Conversation conversation={conversation} />
          </Col>
        ))}
        <Col>
          <Menu mode={"vertical"} style={{ pointerEvents: "auto", border: 0 }}>
            {accounts
              .filter(account => account.id !== session.currentUser.id)
              .map(account => {
                const conversation = conversations.find(conversation =>
                  conversation.recipients.some(r => r.id === account.id)
                )
                return (
                  <Menu.Item
                    onClick={
                      conversation
                        ? () =>
                            dispatch(
                              updateConversation({
                                id: conversation.id,
                                openConversationsAttributes: [
                                  {
                                    id: conversation.openConversationId,
                                    isOpen: true
                                  }
                                ],
                                minimizedConversationsAttributes: [
                                  {
                                    id: conversation.minimizedId,
                                    isMinimized: false
                                  }
                                ],
                                messagesAttributes: conversation.messages
                                  .filter(
                                    m =>
                                      !m.isRead &&
                                      m.account.id !== session.currentUser.id
                                  )
                                  .map(m => ({ ...m, isRead: true }))
                              })
                            )
                        : () =>
                            dispatch({
                              type: "ADD-CONVERSATION",
                              conversation: {
                                key: cuid(),
                                messages: [],
                                recipients: [{ accountId: account.id }],
                                typingConversations: [],
                                isOpen: true
                              }
                            })
                    }
                    style={{
                      display: "flex",
                      textAlign: "center",
                      minHeight: 55,
                      alignItems: "center"
                    }}
                    key={`account_messenger_${account.id}`}>
                    <Tooltip title={account.name} placement={"left"}>
                      <Badge
                        count={
                          conversation
                            ? conversation.messages.filter(
                                message =>
                                  !message.isRead &&
                                  message.account.id !== session.currentUser.id
                              ).length
                            : 0
                        }>
                        <Avatar src={account.avatarSrc || defaultUser} />
                      </Badge>
                    </Tooltip>
                  </Menu.Item>
                )
              })}
          </Menu>
          <Button
            className={"chat-button"}
            shape={"circle"}
            type={"primary"}
            size={"large"}
            style={{
              width: 70,
              height: 70,
              float: "right",
              pointerEvents: "auto"
            }}>
            <IconWrapper
              className='fas fa-comment'
              style={{ fontSize: "25px" }}
            />
          </Button>
        </Col>
      </Row>
    </Affix>
  )
}

export default Chat
