import React from "react"
import { Input } from "antd"
import FieldTypeWrapper from "../FieldTypeWrapper"

const TextField = props => {
  const { field, name, editingMode, onChange, suffix, ...newProps } = props
  const handleChange = e => {
    onChange({
      recordFieldId: props.name,
      content: e.target.value
    })
  }

  return (
    <FieldTypeWrapper
      editingMode={editingMode}
      name={name}
      field={field}
      suffix={suffix}>
      <Input {...newProps} onChange={handleChange} allowClear />
    </FieldTypeWrapper>
  )
}

export default TextField
