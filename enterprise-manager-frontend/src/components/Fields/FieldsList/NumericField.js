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
    ...newProps
  } = props

  const [value, setValue] = useState()
  const [valueWithDependents, setValueWithDependents] = useState()
  const [isFocused, setIsFocused] = useState(false)
  const fieldAfterDependents = useHandleFieldDependents(
    value,
    field.fieldDependents,
    state.filter(f => f.fieldId !== field.id)
  )

  const handleChange = content => {
    if (isFocused) {
      setValue(content)
    }
    onChange({
      recordFieldId: props.name,
      content
    })
  }

  useEffect(() => {
    if (field.fieldDependents && !isFocused) {
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
        {...newProps}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        step={field.acceptsDecimals ? 0.1 : 1}
        style={{ width: "100%" }}
        onChange={handleChange}
        value={!isFocused ? valueWithDependents || value : value}
      />
    </FieldTypeWrapper>
  )
}

export default NumericField
