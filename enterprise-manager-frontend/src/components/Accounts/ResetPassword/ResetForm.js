import React, { Component } from "react"
import { Form, Button, Input } from "antd"

class ResetForm extends Component {
  state = { email: "" }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = e => {
    e.preventDefault()
  }

  render() {
    const { email } = this.state
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Item name='email' label={"Email"}>
          <Input
            type='email'
            value={email}
            placeholder='Enter your email registered...'
          />
        </Form.Item>
        <Button htmlType={"submit"} type='primary' block>
          Reset Password
        </Button>
      </Form>
    )
  }
}

export default ResetForm
