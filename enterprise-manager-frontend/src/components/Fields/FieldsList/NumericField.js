import React from "react"
import { InputNumber } from "antd"
import FieldTypeWrapper from "../FieldTypeWrapper"

const NumericField = props => {
  const { field, onChange, name, editingMode, suffix, ...newProps } = props

  const handleChange = value => {
    onChange({
      recordFieldId: props.name,
      content: value
    })
  }

  return (
    <FieldTypeWrapper
      name={name}
      editingMode={editingMode}
      label={field.name}
      field={field}
      suffix={suffix}>
      <InputNumber
        {...newProps}
        step={field.acceptsDecimals ? 0.1 : 1}
        style={{ width: "100%" }}
        onChange={handleChange}
      />
    </FieldTypeWrapper>
  )
}

export default NumericField
