import React, { useState } from "react"
import FieldTypeWrapper from "../FieldTypeWrapper"
import { Radio } from "antd"

const RadioField = props => {
  const { field, onChange, editingMode, name, suffix, ...newProps } = props
  const [state, setState] = useState({
    recordFieldId: props.name,
    content: ""
  })
  const handleChange = e => {
    const newState = {
      ...state,
      content: (
        field.optionsAttributes.find(o => o.id === e.target.value) || {}
      ).value,
      optionValueId: e.target.value
    }
    setState(newState)
    onChange(newState)
  }

  return (
    <FieldTypeWrapper
      editingMode={editingMode}
      name={name}
      field={field}
      suffix={suffix}>
      <Radio.Group
        options={field.optionsAttributes.map(o => ({
          label: o.value,
          value: o.id
        }))}
        onChange={handleChange}
      />
    </FieldTypeWrapper>
  )
}

export default RadioField
