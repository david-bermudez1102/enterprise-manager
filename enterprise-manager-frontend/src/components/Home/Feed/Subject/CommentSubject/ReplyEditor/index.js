import React from "react"
import { Form, Button } from "antd"
import TextArea from "antd/lib/input/TextArea"
import { useDispatch } from "react-redux"
import { updateStory } from "../../../../../../actions/storiesActions"
import IconWrapper from "../../../../../Icons/IconWrapper"

const ReplyEditor = props => {
  const { currentUser, id } = props
  const dispatch = useDispatch()
  const [form] = Form.useForm()

  const onFinish = data => {
    dispatch(
      updateStory({
        id,
        commentsAttributes: [{ accountId: currentUser.id, ...data }]
      })
    )
    form.resetFields()
  }

  return (
    <Form
      form={form}
      onFinish={onFinish}
      name={`reply_editor_for_comment_${id}`}>
      <Form.Item name={"content"}>
        <TextArea
          rows={2}
          autoSize={{ minRows: 2, maxRows: 5 }}
          placeholder={"Press enter to send comment."}
          onPressEnter={e => {
            e.preventDefault()
            return e.target.value === "" ? null : form.submit()
          }}
        />
      </Form.Item>
      <Form.Item>
        <Button
          htmlType='submit'
          type='primary'
          icon={
            <IconWrapper className='fal fa-paper-plane' style={{ margin: 0 }} />
          }>
          Create comment
        </Button>
      </Form.Item>
    </Form>
  )
}

export default ReplyEditor
