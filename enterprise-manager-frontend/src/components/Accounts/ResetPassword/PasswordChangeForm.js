import React from "react"
import { Form, Button, Input } from "antd"
import { useDispatch } from "react-redux"

const PasswordChangeForm = props => {
  const { token, history } = props
  const dispatch = useDispatch()

  const handleSubmit = data => {
    dispatch(props.handleSubmit(token, data)).then(resp =>
      resp.message === "success" ? history.replace("/login") : null
    )
  }

  return (
    <Form onFinish={handleSubmit} layout={"vertical"} size={"large"}>
      <Form.Item name='password' label={"New Password:"}>
        <Input type='password' placeholder='Enter new password...' />
      </Form.Item>
      <Form.Item name='passwordConfirmation' label={"Confirm Password:"}>
        <Input type='password' placeholder='Confirm your new password...' />
      </Form.Item>
      <Form.Item>
        <Button type={"primary"} htmlType='submit' block>
          Change Password
        </Button>
      </Form.Item>
    </Form>
  )
}

export default PasswordChangeForm
