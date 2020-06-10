import React, { useCallback, useState, useEffect } from "react"
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
    ...newProps
  } = props

  const [state, setState] = useState(null)
  const handleChange = useCallback((value, option) => {
    if (field.selectableResourceAttributes)
      setState({
        recordFieldId: props.name,
        recordValueId: option ? option.id : undefined,
        content: option ? option.value : undefined
      })
    else
      setState({
        recordFieldId: props.name,
        recordOptionId: option ? option.id : undefined,
        content: option ? option.value : undefined
      })
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (state) onChange(state)
    // eslint-disable-next-line
  }, [state])

  return (
    <FieldTypeWrapper
      editingMode={editingMode}
      name={name}
      label={React.cloneElement(suffix, {
        placement: "left",
        children: field.name
      })}
      field={field}>
      <Select
        name={name}
        showSearch
        placeholder={`Select a ${field.name.toLowerCase()}`}
        allowClear
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
                value={option.value}>
                {option.value}
              </Select.Option>
            ))}
      </Select>
    </FieldTypeWrapper>
  )
}

export default SelectableField
