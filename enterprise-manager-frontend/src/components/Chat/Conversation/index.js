import React, { useState, useEffect } from "react"
import { Avatar, Card, Divider, Button, Alert } from "antd"
import { blue } from "@ant-design/colors"
import { MinusOutlined, CloseOutlined } from "@ant-design/icons"
import MessageSent from "../Messages/Sent"
import MessageReceived from "../Messages/Received"
import MessageForm from "../Messages/MessageForm"
import useChat from "../Hooks/useChat"
import { useSelector, shallowEqual } from "react-redux"
import defaultUser from "../../../default_user.png"
import cuid from "cuid"
import InfiniteScroll from "react-infinite-scroller"
import throttle from "lodash"
import UserTyping from "../UserTyping"
import NewMessage from "../Notifications/NewMessage"

console.log(blue)
const Conversation = ({ conversation }) => {
  const { handleMinimized, minimized, isOpen, handleIsOpen } = useChat({
    isMinimized: conversation.isMinimized,
    isOpen: conversation.isOpen,
    conversation
  })

  const { accounts, session } = useSelector(
    ({ accounts, session }) => ({ accounts, session }),
    shallowEqual
  )
  const [isAtBottom, setIsAtBottom] = useState(true)
  const [messages, setMessages] = useState(conversation.messages)
  const [virtualizedMessages, setVirtualizedMessages] = useState([])
  const [haveNewMessages, setNewMessages] = useState(false)
  const [inputRef, setInputRef] = useState()
  const [messagesEndRef, setMessagesEndRef] = useState()

  const [conversationFlashing, setConversationFlashing] = useState(false)

  useEffect(() => {
    setVirtualizedMessages(conversation.messages.slice(-20))
  }, [conversation.messages])

  useEffect(() => {
    if (isAtBottom && messagesEndRef) {
      messagesEndRef.scrollIntoView({ block: "end" })
    }
  }, [isAtBottom, virtualizedMessages])

  useEffect(() => {
    if (inputRef)
      setConversationFlashing(
        conversation.messages.filter(
          m => m.account.id !== session.currentUser.id && !m.isRead
        ).length
      )
  }, [conversation.messages])

  useEffect(() => {
    if (
      !isAtBottom &&
      conversation.messages.filter(m => m.account.id !== session.currentUser.id)
        .length !==
        messages.filter(m => m.account.id !== session.currentUser.id).length
    ) {
      setNewMessages(true)
    } else if (isAtBottom) {
      setMessages(conversation.messages)
    }
  }, [isAtBottom, conversation.messages])

  const onScroll = event => {
    onScrollThrottled(event.target)
  }

  const onScrollThrottled = throttle(target => {
    let { scrollHeight, scrollTop, offsetHeight } = target
    if (Math.ceil(scrollHeight - scrollTop - 40) <= offsetHeight) {
      setIsAtBottom(true)
      setNewMessages(false)
      if (virtualizedMessages.length !== 20)
        setVirtualizedMessages(conversation.messages.slice(-20))
    } else if (isAtBottom) setIsAtBottom(false)
  }, 300)

  console.log(isAtBottom)

  return isOpen ? (
    <Card
      bordered={false}
      className={"chat-window"}
      size={"small"}
      headStyle={{
        boxShadow: "0 -1px 5px rgba(0,0,0,.2)",
        animation: conversationFlashing ? "blinking 2s infinite" : undefined,
        height: "49px",
        background: blue[5],
        borderRadius: "5px 5px 0 0",
        color: "#fff",
        fontWeight: "normal"
      }}
      style={{
        pointerEvents: "auto",
        height: minimized ? "auto" : 400,
        borderRadius: "5px 5px 0 0"
      }}
      bodyStyle={{
        padding: 0,
        display: minimized ? "none" : "flex",
        flexDirection: "column",
        height: "calc(100% - 49px)"
      }}
      extra={[
        <Button
          key={`minimize_action_${conversation.id || cuid()}`}
          type={"link"}
          size={"small"}
          onClick={() => handleMinimized(!minimized)}>
          <MinusOutlined style={{ color: "#fff" }} />
        </Button>,
        <Button
          key={`close_action_${conversation.id || cuid()}`}
          type={"link"}
          size={"small"}
          onClick={() => handleIsOpen(!isOpen)}>
          <CloseOutlined style={{ color: "#fff" }} />
        </Button>
      ]}
      title={
        <div
          onClick={() => handleMinimized(!minimized)}
          style={{
            cursor: "pointer",
            height: "100%",
            display: "flex",
            alignItems: "center"
          }}>
          <Avatar
            style={{ marginRight: 12 }}
            src={conversation.avatarSrc || defaultUser}
          />
          {conversation.recipients
            .filter(r => r.id !== session.currentUser.id)
            .map(r => r.name)
            .join(", ")}
        </div>
      }>
      {!minimized ? (
        <>
          <div
            onScroll={onScroll}
            className={"scroller"}
            style={{
              flex: 1,
              margin: 0,
              overflowY: "auto",
              paddingLeft: 14,
              paddingRight: 14,
              position: "relative"
            }}>
            <InfiniteScroll
              threshold={1}
              height={"100%"}
              isReverse
              loadMore={() =>
                setTimeout(
                  () =>
                    setVirtualizedMessages(
                      conversation.messages.slice(
                        -20 - virtualizedMessages.length
                      )
                    ),
                  500
                )
              }
              loader={<span>Loading</span>}
              hasMore={
                virtualizedMessages.length < conversation.messages.length
              }
              useWindow={false}>
              <NewMessage
                haveNewMessages={haveNewMessages}
                messagesEndRef={messagesEndRef}
              />
              {virtualizedMessages.map(message =>
                message.account.id === session.currentUser.id ? (
                  <MessageSent key={`message_${message.id}`} {...message} />
                ) : (
                  <MessageReceived key={`message_${message.id}`} {...message} />
                )
              )}

              <div
                ref={setMessagesEndRef}
                style={{ float: "left", clear: "both" }}>
                <UserTyping conversation={conversation} session={session} />
              </div>
            </InfiniteScroll>
          </div>
          <div style={{ background: "#f4f7f9" }}>
            <Divider style={{ margin: 0 }} />
            <MessageForm
              conversationFlashing={conversationFlashing}
              isAtBottom={isAtBottom}
              setInputRef={setInputRef}
              conversation={conversation}
              messagesEndRef={messagesEndRef}
            />
          </div>
        </>
      ) : null}
    </Card>
  ) : null
}

export default Conversation
