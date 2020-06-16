import React, { useState } from "react"
import LogoUploader from "../Uploader/LogoUploader"
import "./styles.css"

import snakecaseKeys from "snakecase-keys"
import { Button, Form, Input } from "antd"

const OrganizationForm = props => {
  const [logo, setLogo] = useState()

  const handleOnSubmit = data => {
    props.addOrganization({
      logo,
      ...snakecaseKeys(data)
    })
  }

  return (
    <Form size={"large"} onFinish={handleOnSubmit} layout={"vertical"}>
      <Form.Item
        name='name'
        label={"Organization Name"}
        rules={[{ required: true }]}>
        <Input placeholder={"Enter the name of your organization"} />
      </Form.Item>
      <Form.Item label={"Organization Logo"} rules={[{ required: true }]}>
        <LogoUploader handleLogoChange={setLogo} />
      </Form.Item>
      <Form.Item>
        <Button type={"primary"} htmlType='submit' block>
          Create
        </Button>
      </Form.Item>
    </Form>
  )
}

export default OrganizationForm
