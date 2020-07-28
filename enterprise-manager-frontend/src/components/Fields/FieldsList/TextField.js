import React from "react"
import { Input } from "antd"
import FieldTypeWrapper from "../FieldTypeWrapper"

const TextField = props => {
  const {
    field,
    name,
    editingMode,
    onChange,
    suffix,
    initialValue,
    ...newProps
  } = props
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
      <Input
        {...newProps}
        onChange={editingMode ? handleChange : undefined}
        onBlur={!editingMode ? handleChange : newProps.onBlur}
        onPressEnter={!editingMode ? handleChange : newProps.onPressEnter}
        allowClear
      />
    </FieldTypeWrapper>
  )
}

export default TextField
