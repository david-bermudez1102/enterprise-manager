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
  const handleFieldDependents = useHandleFieldDependents(
    value,
    field.fieldDependents,
    state
  )

  const handleChange = content => {
    if (isFocused) {
      setValue(content)
      setValueWithDependents(content)
    }
    onChange({
      recordFieldId: props.name,
      content
    })
  }

  useEffect(() => {
    if (field.fieldDependents && !isFocused && handleFieldDependents) {
      setValueWithDependents(handleFieldDependents)
    }
  }, [handleFieldDependents])

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
        onBlur={() => {
          setIsFocused(false)
          setValue(value)
        }}
        step={field.acceptsDecimals ? 0.1 : 1}
        style={{ width: "100%" }}
        onChange={handleChange}
        value={valueWithDependents}
      />
    </FieldTypeWrapper>
  )
}

export default NumericField
