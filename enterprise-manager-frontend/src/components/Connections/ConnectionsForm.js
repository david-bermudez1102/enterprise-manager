import React, { useEffect } from "react"
import { Form, Input, Button, Select } from "antd"

const ConnectionsForm = props => {
  const {
    updateResource,
    resource,
    organizationId,
    integrationId,
    type
  } = props
  const { zohoConnectionAttributes } = resource

  const [form] = Form.useForm()

  const handleSubmit = data => {
    updateResource({
      id: resource.id,
      organizationId,
      [type]: {
        integrationId,
        formId: resource.id,
        ...data
      }
    })
  }

  useEffect(() => {
    form.setFieldsValue(zohoConnectionAttributes)
    // eslint-disable-next-line
  }, [zohoConnectionAttributes])

  return (
    <Form onFinish={handleSubmit} form={form}>
      <Form.Item
        name='name'
        label={"Connection name"}
        rules={[{ required: true, message: "Enter a valid connection name" }]}>
        <Input placeholder='Enter a name for this connection...' />
      </Form.Item>
      <Form.Item
        name='connectionType'
        label={"Connection to"}
        rules={[{ required: true, message: "Enter a valid connection type" }]}>
        <Select placeholder='Select an option'>
          <Select.Option value='select'>Select</Select.Option>
          <Select.Option value='contacts'>Contacts</Select.Option>
          <Select.Option value='items'>Items</Select.Option>
          <Select.Option value='invoices'>Invoices</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item>
        <Button type={"primary"} htmlType={"submit"}>
          Update Connection
        </Button>
      </Form.Item>
    </Form>
  )
}

export default React.memo(ConnectionsForm)
