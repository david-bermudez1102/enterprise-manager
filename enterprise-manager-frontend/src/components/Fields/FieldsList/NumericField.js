import React, { useState, useEffect } from "react"
import { InputNumber } from "antd"
import FieldTypeWrapper from "../FieldTypeWrapper"
import useHandleFieldDependents from "./FieldDependants/handleFieldDependants"

const NumericField = props => {
  const {
    field,
    onChange,
    name,
    editingMode,
    suffix,
    state,
    form,
    record,
    ...newProps
  } = props

  const [value, setValue] = useState()
  const [valueWithDependents, setValueWithDependents] = useState()
  const [isFocused, setIsFocused] = useState(false)
  const fieldAfterDependents = useHandleFieldDependents(
    value,
    field.fieldDependents,
    editingMode
      ? Object.entries(record)
          .map(([fieldId, content]) => ({
            fieldId: parseInt(fieldId),
            content
          }))
          .filter(f => f.fieldId && f.fieldId !== field.id)
      : state.filter(f => f.fieldId !== field.id)
  )

  const handleChange = content => {
    if (isFocused) {
      setValue(content)
    }
    onChange({
      recordFieldId: props.name,
      content
    })
    form && form.setFieldsValue({ [name]: content })
  }

  useEffect(() => {
    if (field.fieldDependents && !isFocused && !editingMode) {
      setValueWithDependents(fieldAfterDependents)
      handleChange(fieldAfterDependents)
    }
    // eslint-disable-next-line
  }, [fieldAfterDependents, isFocused])

  return (
    <FieldTypeWrapper
      name={name}
      editingMode={editingMode}
      label={field.name}
      field={field}
      suffix={suffix}>
      <InputNumber
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        step={field.acceptsDecimals ? 0.1 : 1}
        onChange={editingMode ? handleChange : undefined}
        value={
          !editingMode
            ? !isFocused
              ? valueWithDependents || value
              : value
            : undefined
        }
        {...newProps}
        style={{ width: "100%" }}
      />
    </FieldTypeWrapper>
  )
}

export default NumericField
