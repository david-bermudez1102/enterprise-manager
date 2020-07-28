import React from "react"
import FieldTypeWrapper from "../FieldTypeWrapper"
import { Switch } from "antd"

const BooleanField = props => {
  const {
    field,
    name,
    editingMode,
    onChange,
    suffix,
    initialValue,
    state,
    ...newProps
  } = props

  const handleChange = checked => {
    onChange({
      recordFieldId: props.name,
      content: checked ? "Yes" : ""
    })
  }

  console.log(newProps)

  return (
    <FieldTypeWrapper
      editingMode={editingMode}
      name={name}
      field={field}
      suffix={suffix}>
      <Switch
        onChange={handleChange}
        size={editingMode ? "small" : "default"}
        {...newProps}
        defaultChecked={initialValue && initialValue !== ""}
      />
    </FieldTypeWrapper>
  )
}

export default BooleanField
