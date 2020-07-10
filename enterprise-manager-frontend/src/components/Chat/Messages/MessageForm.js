import React, { useState, useEffect, useRef, useCallback } from "react"
import TextArea from "antd/lib/input/TextArea"
import { Form, Button } from "antd"
import IconWrapper from "../../Icons/IconWrapper"
import { useSelector, shallowEqual, useDispatch } from "react-redux"
import {
  updateConversation,
  addConversation,
  messagePreview
} from "../../../actions/conversationsActions"
import cuid from "cuid"

const MessageForm = ({
  conversation,
  messagesEndRef,
  setInputRef,
  conversationFlashing,
  isAtBottom
}) => {
  const { session } = useSelector(({ session }) => ({ session }), shallowEqual)
  const accountId = session.currentUser.id
  const dispatch = useDispatch()
  const [form] = Form.useForm()
  const mounted = useRef(null)
  const [isTyping, setIsTyping] = useState(false)
  const [typingTimeout, setTypingTimeout] = useState(0)
  const [focused, setFocused] = useState(true)

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true
    } else {
      if (conversation.id)
        dispatch(
          updateConversation({
            id: conversation.id,
            typingConversationsAttributes: [
              {
                id: conversation.typingConversations.find(
                  t => t.accountId === accountId
                ).id,
                isTyping
              }
            ]
          })
        )
    }
  }, [isTyping])

  const onFinish = data => {
    const renderKey = cuid()
    dispatch(
      messagePreview({
        ...conversation,
        messages: [
          ...conversation.messages,
          {
            ...data,
            account: { id: accountId, name: session.currentUser.name },
            sent: false,
            key: renderKey
          }
        ]
      })
    )
    if (conversation.id)
      dispatch(
        updateConversation({
          id: conversation.id,
          messagesAttributes: [
            ...conversation.messages
              .filter(m => m.status === 0 && !m.sent)
              .map(m => ({
                ...m,
                accountId: m.account.id,
                renderKey: m.key
              })),
            { ...data, accountId, renderKey }
          ]
        })
      )
    else {
      dispatch(
        addConversation({
          renderKey: conversation.key,
          messagesAttributes: [{ ...data, accountId, renderKey }],
          openConversationsAttributes: [
            { accountId, isOpen: true },
            ...conversation.recipients
          ],
          minimizedConversationsAttributes: [
            { accountId },
            ...conversation.recipients
          ],
          typingConversationsAttributes: [
            { accountId },
            ...conversation.recipients
          ]
        })
      )
    }

    form.resetFields()
    messagesEndRef.scrollIntoView()
  }

  const onTyping = useCallback(
    e => {
      if (!isTyping) setIsTyping(true)
      if (typingTimeout) clearTimeout(typingTimeout)
      setTypingTimeout(setTimeout(() => setIsTyping(false), 2000))
    },
    [isTyping, typingTimeout]
  )

  const onFocus = e => {
    setFocused(true)
    if (conversationFlashing && isAtBottom)
      dispatch(
        updateConversation({
          id: conversation.id,
          messagesAttributes: conversation.messages
            .filter(
              message => message.account.id !== accountId && !message.isRead
            )
            .map(message => ({ ...message, isRead: true }))
        })
      )
  }

  return (
    <Form
      form={form}
      onFinish={onFinish}
      size={"large"}
      layout='inline'
      style={{
        display: "flex",
        flexWrap: "nowrap",
        background: focused ? "inherit" : "#f4f7f9",

        boxShadow: focused ? "0 0 4px 1px rgba(24, 144, 255, .2)" : "none"
      }}>
      <Form.Item
        name={"content"}
        style={{ marginRight: 0, flex: 1, border: 0 }}>
        <TextArea
          id={"reply"}
          ref={setInputRef}
          autoFocus
          onFocus={onFocus}
          onChange={onTyping}
          onBlur={() => setFocused(false)}
          onPressEnter={e => {
            e.preventDefault()
            return e.target.value === "" ? null : form.submit()
          }}
          placeholder={"Write a reply..."}
          autoSize={{ minRows: 2, maxRows: 5 }}
          style={{
            border: 0,
            outline: "none",
            resize: "none",
            background: "inherit",
            boxShadow: "none"
          }}
        />
      </Form.Item>
      <Form.Item style={{ marginRight: 0 }}>
        <Button
          size={"large"}
          icon={<IconWrapper className='fal fa-smile' style={{ margin: 0 }} />}
          type='default'
          style={{
            border: 0,
            background: "inherit",
            boxShadow: "none"
          }}></Button>
      </Form.Item>
      <Form.Item style={{ marginRight: 0 }}>
        <Button
          size={"large"}
          icon={
            <IconWrapper className='fal fa-paper-plane' style={{ margin: 0 }} />
          }
          htmlType='submit'
          type='default'
          style={{
            border: 0,
            background: "inherit",
            boxShadow: "none"
          }}></Button>
      </Form.Item>
    </Form>
  )
}

export default React.memo(MessageForm)
