import React from "react"
import FieldValueGenerator from "../FieldValueGenerator"

const CombinedField = props => {
  const { field, editingMode, onChange, ...newProps } = props

  const handleChange = content => {
    onChange({
      recordFieldId: props.name,
      content
    })
  }

  return field.combinedFields.length > 1 ? (
    <FieldValueGenerator
      {...newProps}
      onChange={handleChange}
      field={field}
      required
    />
  ) : null
}

export default CombinedField
