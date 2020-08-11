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
    <Row gutter={[24, 16]} align={"middle"} style={{ width: "100%" }}>
      {!editingMode && suffix && <Col span={1}>{suffix}</Col>}
      <Col flex={"auto"}>
        <Form.Item
          valuePropName={
            field.fieldType === "boolean_field" ? "checked" : undefined
          }
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
          {children}
        </Form.Item>
      </Col>
    </Row>
  )
}
export default React.memo(FieldTypeWrapper)
