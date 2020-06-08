import React, { useState, useEffect } from "react"
import { Drawer, Form, Input, Button, Divider } from "antd"
import Title from "antd/lib/typography/Title"
import { plural } from "pluralize"
import { QuestionCircleTwoTone } from "@ant-design/icons"
import { useDispatch } from "react-redux"
import { updateResource } from "../../actions/resourceActions"

const ConnectionSettings = ({ connectionName, recordFields, resource }) => {
  const [visible, setVisible] = useState(true)
  const dispatch = useDispatch()
  const [form] = Form.useForm()

  const onFinish = data => {
    dispatch(
      updateResource({
        ...resource,
        recordFieldsAttributes: Object.keys(data).map(k => ({
          id: k,
          zohoFieldName: data[k]
        }))
      })
    )
  }

  useEffect(() => {
    form.setFieldsValue(
      resource.recordFieldsAttributes.reduce((result, item) => {
        result[item.id] = item.zohoFieldName
        return result
      }, {})
    )
    // eslint-disable-next-line
  }, [resource])

  return (
    <Drawer
      width={600}
      placement='right'
      closable={true}
      visible={visible}
      onClose={() => setVisible(false)}>
      <Title level={4}>
        {connectionName} Connection for {plural(resource.name)}
      </Title>
      <Divider />
      <Form
        form={form}
        onFinish={onFinish}
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 19, offset: 1 }}
        colon={false}>
        <Form.Item label={<strong>Field Name</strong>}>
          {connectionName} Field Name
        </Form.Item>
        {recordFields.map(f => (
          <Form.Item
            key={`description_label_${f.id}`}
            name={f.id}
            label={f.name}>
            <Input
              placeholder={`Enter ${connectionName} field name`}
              suffix={<QuestionCircleTwoTone />}
            />
          </Form.Item>
        ))}
        <Form.Item wrapperCol={{ span: 19, offset: 6 }}>
          <Button type={"primary"} htmlType={"submit"}>
            Update
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  )
}

export default ConnectionSettings
