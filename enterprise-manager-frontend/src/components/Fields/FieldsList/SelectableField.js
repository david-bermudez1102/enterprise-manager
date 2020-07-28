import React, { useState, useEffect } from "react"
import { Select } from "antd"
import FieldTypeWrapper from "../FieldTypeWrapper"

const SelectableField = props => {
  const {
    field,
    fieldName,
    suffix,
    editingMode,
    name,
    onChange,
    form,
    ...newProps
  } = props

  const [state, setState] = useState(null)
  const handleChange = (value, option) => {
    if (field.selectableResourceAttributes)
      setState({
        recordFieldId: props.name,
        recordValueId: option ? option.id : undefined,
        content: option ? option.value : undefined,
        recordId: option ? option["data-record-id"] : undefined
      })
    else
      setState({
        recordFieldId: props.name,
        recordOptionId: option ? option.id : undefined,
        content: option ? option.value : undefined,
        recordId: option ? option["data-record-id"] : undefined
      })
  }

  useEffect(() => {
    if (state) onChange(state)
    // eslint-disable-next-line
  }, [state])

  return (
    <FieldTypeWrapper
      editingMode={editingMode}
      name={name}
      label={field.name}
      field={field}
      suffix={suffix}>
      <Select
        name={name}
        showSearch
        placeholder={`Select a ${field.name.toLowerCase()}`}
        allowClear={!editingMode}
        onChange={handleChange}
        {...newProps}>
        {field.selectableResourceAttributes
          ? [
              ...new Map(
                field.selectableResourceAttributes.optionsAttributes.map(
                  item => [item.value, item]
                )
              ).values()
            ].map(option => (
              <Select.Option
                key={`selectable_option_${field.id}_${option.id}`}
                id={option.id}
                data-record-id={option.recordId}
                value={option.value}>
                {option.value}
              </Select.Option>
            ))
          : [
              ...new Map(
                field.selectableResourceAttributes.optionsAttributes.map(
                  item => [item.value, item]
                )
              ).values()
            ].map(option => (
              <Select.Option
                key={`selectable_option_${field.id}_${option.id}`}
                id={option.id}
                data-record-id={option.recordId}
                value={option.value}>
                {option.value}
              </Select.Option>
            ))}
      </Select>
    </FieldTypeWrapper>
  )
}

export default SelectableField
