import React from "react"
import { Form, Button, Input } from "antd"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"

const ConfirmPasswordForm = props => {
  const { token } = props

  const history = useHistory()
  const dispatch = useDispatch()

  const handleSubmit = data => {
    console.log(data)
    dispatch(props.handleSubmit(token, data)).then(resp =>
      resp === "success" ? history.replace("/login") : null
    )
  }
  return (
    <Form onFinish={handleSubmit} layout={"vertical"} size={"large"}>
      <Form.Item
        name='password'
        rules={[{ required: true, message: "Enter your password!" }]}>
        <Input type='password' placeholder='Enter your password...' />
      </Form.Item>
      <Form.Item>
        <Button type={"primary"} htmlType='submit' block>
          Activate Account
        </Button>
      </Form.Item>
    </Form>
  )
}

export default ConfirmPasswordForm
