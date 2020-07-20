import React, { useState, useEffect } from "react"
import { formatValues } from "./formatValues"
import { Input } from "antd"
import FieldTypeWrapper from "../FieldTypeWrapper"
import { format } from "date-fns"

const FieldValueGenerator = props => {
  const { children, state, field, suffix, name, onChange, ...newProps } = props
  const { combinedFields, fieldFormat, editingMode, readOnly } = field
  const [value, setValue] = useState("")

  useEffect(() => {
    const newValue = formatValues(
      fieldFormat,
      (combinedFields || [])
        .map(c =>
          c === "createdAt" || c === "updatedAt"
            ? {
                fieldType: "date",
                content: format(new Date(), "MM/dd/yyyy")
              }
            : (state || []).find(f => f.recordFieldId === c)
        )
        .filter(c => c)
        .map(c => {
          if (c.fieldType === "numeric_field") return `${c.content} ${c.name}`
          else if (c.fieldType === "boolean_field")
            return c.content === "Yes" ? c.name : undefined
          return c.content
        })
        .filter(c => c)
    )
    setValue(newValue)
    // eslint-disable-next-line
  }, [state, combinedFields, fieldFormat])

  useEffect(() => {
    onChange(value)
    // eslint-disable-next-line
  }, [value])

  return (
    <FieldTypeWrapper
      editingMode={editingMode}
      name={name}
      field={field}
      suffix={suffix}>
      <Input {...newProps} value={value} readOnly={readOnly} />
    </FieldTypeWrapper>
  )
}

export default FieldValueGenerator
