import React from "react"
import { Form, Row, Col } from "antd"

const FieldTypeWrapper = ({
  editingMode,
  label,
  name,
  field,
  suffix,
  children
}) => {
  return (
    <Form.Item
      style={field.style}
      label={!editingMode ? label || field.name : "undefined"}
      name={name}
      rules={[
        {
          required: field.isRequired,
          message: `Please enter a valid ${field.name.toLowerCase()}`
        }
      ]}
      noStyle={editingMode}>
      <Row gutter={[24, 16]} align={"middle"}>
        {!editingMode && suffix && <Col span={1}>{suffix}</Col>}
        <Col flex={"auto"}>{children}</Col>
      </Row>
    </Form.Item>
  )
}
export default FieldTypeWrapper
