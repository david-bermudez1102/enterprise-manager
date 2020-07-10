import React from "react"
import FieldTypeWrapper from "../FieldTypeWrapper"
import { Switch } from "antd"

const BooleanField = props => {
  const { field, name, editingMode, onChange, suffix, ...newProps } = props

  const handleChange = checked => {
    onChange({
      recordFieldId: props.name,
      content: checked ? "Yes" : ""
    })
  }

  return (
    <FieldTypeWrapper
      editingMode={editingMode}
      name={name}
      field={field}
      suffix={suffix}>
      <Switch {...newProps} onChange={handleChange} />
    </FieldTypeWrapper>
  )
}

export default BooleanField
