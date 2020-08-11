import React, { useState } from "react"
import { Affix, Row, Col, Menu, Avatar, Tooltip, Badge } from "antd"
import "./styles.scss"
import Conversation from "./Conversation"
import { useSelector, shallowEqual, useDispatch } from "react-redux"
import defaultUser from "../../default_user.png"
import { updateConversation } from "../../actions/conversationsActions"
import cuid from "cuid"
import ChatWidget from "./Widget"

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

  const [isWidgetOpen, setIsWidgetOpen] = useState(false)

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
            style={{ top: 16 }}
            key={`conversation_window_${conversation.key}`}>
            <Conversation conversation={conversation} />
          </Col>
        ))}
        <Col md={3} sm={6} xs={5} style={{ textAlign: "right" }}>
          {isWidgetOpen ? (
            <Menu
              mode={"vertical"}
              className={"conversations-list"}
              style={{ pointerEvents: "auto", border: 0 }}>
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
                                  recipients: [
                                    {
                                      accountId: account.id,
                                      name: account.name,
                                      avatarSrc: account.avatarSrc
                                    }
                                  ],
                                  typingConversations: [],
                                  isOpen: true
                                }
                              })
                      }
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        minHeight: 65,
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
                                    message.account.id !==
                                      session.currentUser.id
                                ).length
                              : 0
                          }>
                          <Avatar
                            size={"large"}
                            src={account.avatarSrc || defaultUser}
                          />
                        </Badge>
                      </Tooltip>
                    </Menu.Item>
                  )
                })}
            </Menu>
          ) : null}
          <ChatWidget
            isWidgetOpen={isWidgetOpen}
            setIsWidgetOpen={setIsWidgetOpen}
            messages={conversations
              .map(conversation => conversation.messages)
              .flat()}
          />
        </Col>
      </Row>
    </Affix>
  )
}

export default React.memo(Chat)
