import React, { useState } from "react"
import { Checkbox } from "antd"
import FieldTypeWrapper from "../FieldTypeWrapper"

const CheckboxField = props => {
  const { field, editingMode, onChange, name, suffix, ...newProps } = props
  const [state, setState] = useState({
    recordFieldId: name,
    content: "",
    checkboxOptionsAttributes: []
  })
  const [checked, setChecked] = useState([])

  const handleChange = checked => {
    const newState = {
      ...state,
      content: field.optionsAttributes
        .filter(o => checked.includes(o.id))
        .map(o => o.value)
        .join(", "),
      checkboxOptionsAttributes: checked.map(o => ({ optionId: o }))
    }
    setChecked(checked)
    setState(newState)
    onChange(newState)
  }

  return (
    <FieldTypeWrapper
      editingMode={editingMode}
      name={name}
      field={field}
      suffix={suffix}>
      <Checkbox.Group
        options={field.optionsAttributes.map(o => ({
          id: o.id,
          label: o.value,
          value: o.id
        }))}
        onChange={handleChange}
        value={checked}
      />
    </FieldTypeWrapper>
  )
}

export default CheckboxField
