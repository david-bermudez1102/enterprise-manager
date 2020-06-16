import React, { Component } from "react"
import { Form, Button, Input } from "antd"
import { UserOutlined, MailOutlined, LockOutlined } from "@ant-design/icons"

export default class RootForm extends Component {
  handleOnSubmit = data => {
    const { addRoot, organizationId } = this.props
    addRoot({ ...data, organizationId })
  }

  render() {
    return (
      <Form size={"large"} onFinish={this.handleOnSubmit} layout={"vertical"}>
        <Form.Item
          name='name'
          rules={[{ required: true, message: "Enter a valid name" }]}>
          <Input prefix={<UserOutlined />} placeholder='Enter your name...' />
        </Form.Item>
        <Form.Item
          name='email'
          rules={[{ required: true, message: "Enter a valid email" }]}>
          <Input
            type={"email"}
            prefix={<MailOutlined />}
            placeholder='Enter your email...'
          />
        </Form.Item>
        <Form.Item
          name='password'
          rules={[{ required: true, message: "Enter a valid password" }]}>
          <Input
            prefix={<LockOutlined />}
            type={"password"}
            placeholder='Enter password...'
          />
        </Form.Item>
        <Button type={"primary"} block htmlType='submit'>
          Create Root
        </Button>
      </Form>
    )
  }
}
