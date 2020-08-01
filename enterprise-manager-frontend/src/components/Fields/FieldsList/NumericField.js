import React, { useState, useEffect } from "react"
import { InputNumber } from "antd"
import FieldTypeWrapper from "../FieldTypeWrapper"
import useHandleFieldDependents from "./FieldDependants/handleFieldDependants"

const NumericField = props => {
  const {
    field,
    onChange,
    onBlur,
    name,
    editingMode,
    suffix,
    state,
    form,
    record,
    ...newProps
  } = props

  const [value, setValue] = useState(editingMode ? state.content : 0)
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
    setValue(content)

    onChange({
      recordFieldId: props.name,
      content
    })
  }

  useEffect(() => {
    if (field.fieldDependents && !isFocused && !editingMode) {
      setValueWithDependents(fieldAfterDependents)
      form.setFieldsValue({ [name]: fieldAfterDependents })
    }
    // eslint-disable-next-line
  }, [editingMode, fieldAfterDependents, isFocused])

  console.log(valueWithDependents, value)

  return (
    <FieldTypeWrapper
      name={name}
      editingMode={editingMode}
      label={field.name}
      field={field}
      suffix={suffix}>
      <div>
        <InputNumber
          {...newProps}
          onFocus={() => setIsFocused(true)}
          onBlur={editingMode ? onBlur : () => setIsFocused(false)}
          step={field.acceptsDecimals ? 0.1 : 1}
          onChange={handleChange}
          value={
            !editingMode
              ? !isFocused
                ? valueWithDependents || value
                : value
              : !isFocused
              ? state.contentAfterDependents
              : value
          }
          style={{ width: "100%" }}
        />
      </div>
    </FieldTypeWrapper>
  )
}

export default NumericField
