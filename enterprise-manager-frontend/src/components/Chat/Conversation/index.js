import React, { useState, useLayoutEffect } from "react"
import { Avatar, Card, Divider, Button, Badge } from "antd"
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
import UserTyping from "../UserTyping"
import NewMessage from "../Notifications/NewMessage"
import { debounce } from "lodash"
import HashLoader from "react-spinners/HashLoader"

const Conversation = ({ conversation }) => {
  const { handleMinimized, minimized, isOpen, handleIsOpen } = useChat({
    isMinimized: conversation.isMinimized,
    isOpen: conversation.isOpen,
    conversation
  })

  const { session } = useSelector(({ session }) => ({ session }), shallowEqual)

  const [isAtBottom, setIsAtBottom] = useState(true)
  const [messages, setMessages] = useState(conversation.messages)
  const [virtualizedMessages, setVirtualizedMessages] = useState([])
  const [haveNewMessages, setNewMessages] = useState(false)
  const [inputRef, setInputRef] = useState()
  const [messagesEndRef, setMessagesEndRef] = useState()

  const [conversationFlashing, setConversationFlashing] = useState(false)

  useLayoutEffect(() => {
    setVirtualizedMessages(
      conversation.messages.slice(-virtualizedMessages.length)
    )
    // eslint-disable-next-line
  }, [conversation.messages])

  useLayoutEffect(() => {
    if (isAtBottom && messagesEndRef) {
      messagesEndRef.scrollIntoView({ block: "end" })
    }
    // eslint-disable-next-line
  }, [isAtBottom, virtualizedMessages])

  useLayoutEffect(() => {
    if (inputRef)
      setConversationFlashing(
        conversation.messages.filter(
          m => m.account.id !== session.currentUser.id && !m.isRead
        ).length
      )
    // eslint-disable-next-line
  }, [conversation.messages])

  useLayoutEffect(() => {
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
    // eslint-disable-next-line
  }, [isAtBottom, conversation.messages])

  const onScroll = event => {
    onScrollDebounced(event.target)
  }

  const onScrollDebounced = debounce(target => {
    let { scrollHeight, scrollTop, offsetHeight } = target
    if (Math.ceil(scrollHeight - scrollTop - 50) <= offsetHeight) {
      setIsAtBottom(true)
      setNewMessages(false)
      if (virtualizedMessages.length !== 20)
        setVirtualizedMessages(conversation.messages.slice(-20))
    } else setIsAtBottom(false)
  }, 100)

  return isOpen ? (
    <Card
      bordered={false}
      className={"chat-window"}
      headStyle={{
        boxShadow: "0 0px 5px rgba(0,0,0,.2)",
        animation: conversationFlashing ? "blinking 2s infinite" : undefined,
        height: "55px",
        background: "#4e8cff",
        borderRadius: "5px 5px 0 0",
        color: "#fff",
        fontWeight: "normal"
      }}
      style={{
        pointerEvents: "auto",
        height: minimized ? "auto" : 430,
        borderRadius: "8px 8px 0 0"
      }}
      bodyStyle={{
        padding: 0,
        display: minimized ? "none" : "flex",
        flexDirection: "column",
        height: "calc(100% - 55px)"
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
          <Badge dot status={"success"} offset={[-15, 24]}>
            <Avatar
              style={{ marginRight: 12 }}
              src={conversation.avatarSrc || defaultUser}
            />
          </Badge>
          {conversation.recipients
            .filter(r => r.id !== session.currentUser.id)
            .map(r => r.name)
            .join(", ")}{" "}
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
              paddingLeft: 23,
              paddingRight: 23,
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
                  600
                )
              }
              loader={
                <span
                  key={0}
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center"
                  }}>
                  <HashLoader color={blue[3]} size={25} />
                </span>
              }
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
                  <MessageSent {...message} />
                ) : (
                  <MessageReceived {...message} />
                )
              )}
            </InfiniteScroll>
            <div ref={setMessagesEndRef} style={{ minHeight: 10 }}>
              <UserTyping conversation={conversation} session={session} />
            </div>
          </div>
          <div>
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

export default React.memo(Conversation, shallowEqual)
