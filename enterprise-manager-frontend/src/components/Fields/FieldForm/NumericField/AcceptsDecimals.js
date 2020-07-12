import React from "react"
import { useState } from "react"
import { Col, Checkbox, Divider } from "antd"
import FieldDependant from "../FieldDependant"

const AcceptsDecimals = ({ handleChange, resourceId, fieldType, field }) => {
  const [acceptsDecimals, setAcceptsDecimals] = useState(field.acceptsDecimals)

  const handleCheckBoxChange = e => {
    setAcceptsDecimals(e.target.checked)
    handleChange({ acceptsDecimals: e.target.checked })
  }

  return fieldType === "numeric_field" ? (
    <Col span={24} order={24}>
      <Divider />
      <Checkbox
        name='acceptsDecimals'
        onChange={handleCheckBoxChange}
        checked={acceptsDecimals}>
        Accepts Decimals
      </Checkbox>
      <Divider />
      <FieldDependant
        field={field}
        resourceId={resourceId}
        onChange={handleChange}
      />
    </Col>
  ) : null
}
export default AcceptsDecimals
