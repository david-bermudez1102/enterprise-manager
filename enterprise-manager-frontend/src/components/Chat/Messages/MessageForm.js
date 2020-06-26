import React, { useState, useEffect, useRef } from "react"
import TextArea from "antd/lib/input/TextArea"
import { Form, Button } from "antd"
import IconWrapper from "../../Icons/IconWrapper"
import { useSelector, shallowEqual, useDispatch } from "react-redux"
import {
  updateConversation,
  addConversation
} from "../../../actions/conversationsActions"

const MessageForm = ({
  conversation,
  messagesEndRef,
  setInputRef,
  conversationFlashing,
  setConversationFlashing,
  isAtBottom
}) => {
  const { session } = useSelector(({ session }) => ({ session }), shallowEqual)
  const accountId = session.currentUser.id
  const dispatch = useDispatch()
  const [form] = Form.useForm()
  const mounted = useRef()
  const [isTyping, setIsTyping] = useState(false)
  const [typingTimeout, setTypingTimeout] = useState(0)

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
    if (conversation.id)
      dispatch(
        updateConversation({
          id: conversation.id,
          messagesAttributes: [{ ...data, accountId }]
        })
      )
    else
      dispatch(
        addConversation({
          renderKey: conversation.key,
          messagesAttributes: [{ ...data, accountId }],
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
    form.resetFields()
    messagesEndRef.scrollIntoView()
  }

  const onTyping = e => {
    if (!isTyping) setIsTyping(true)
    if (typingTimeout) clearTimeout(typingTimeout)
    setTypingTimeout(setTimeout(() => setIsTyping(false), 2000))
  }

  const onFocus = e => {
    console.log(conversationFlashing, isAtBottom)
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
      size={"small"}
      layout='inline'
      style={{ display: "flex", flexWrap: "nowrap", background: "inherit" }}>
      <Form.Item
        name={"content"}
        style={{ marginRight: 0, flex: 1, border: 0 }}
        noStyle>
        <TextArea
          id={"reply"}
          ref={setInputRef}
          autoFocus
          onFocus={onFocus}
          onChange={onTyping}
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
            background: "inherit"
          }}
        />
      </Form.Item>
      <Form.Item style={{ marginRight: 0 }}>
        <Button
          size={"large"}
          icon={<IconWrapper className='fal fa-smile' style={{ margin: 0 }} />}
          htmlType='submit'
          type='link'></Button>
      </Form.Item>
      <Form.Item style={{ marginRight: 0 }}>
        <Button
          size={"large"}
          icon={
            <IconWrapper className='far fa-paper-plane' style={{ margin: 0 }} />
          }
          htmlType='submit'
          type='link'></Button>
      </Form.Item>
    </Form>
  )
}

export default MessageForm
