import React from "react"
import { Form, Input, Button, Checkbox } from "antd"
import { UserOutlined, LockOutlined } from "@ant-design/icons"
import { Link } from "react-router-dom"

export default function LoginForm(props) {
  const onFinish = values => {
    props.handleOnSubmit(values)
  }
  return (
    <Form
      name='normal_login'
      className='login-form'
      initialValues={{
        remember: true
      }}
      onFinish={onFinish}>
      <Form.Item
        name='username'
        rules={[
          {
            required: true,
            message: "Please input your Username!"
          }
        ]}>
        <Input
          size='large'
          prefix={<UserOutlined color={"primary"} />}
          placeholder='Email or username...'
        />
      </Form.Item>
      <Form.Item
        name='password'
        rules={[
          {
            required: true,
            message: "Please input your Password!"
          }
        ]}>
        <Input.Password
          size='large'
          prefix={<LockOutlined className='site-form-item-icon' />}
          placeholder='Password'
        />
      </Form.Item>
      <Form.Item>
        <Form.Item name='remember' valuePropName='checked' noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Link className='login-form-forgot' to='/reset_password'>
          Forgot password
        </Link>
      </Form.Item>

      <Form.Item>
        <Button type='primary' htmlType='submit' className='login-form-button'>
          Log in
        </Button>
      </Form.Item>
    </Form>
  )
}
