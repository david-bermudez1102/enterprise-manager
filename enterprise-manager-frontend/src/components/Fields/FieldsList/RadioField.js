import React, { useState } from "react"
import FieldTypeWrapper from "../FieldTypeWrapper"
import { Radio, Button } from "antd"
import { RedoOutlined } from "@ant-design/icons"

const RadioField = props => {
  const { field, onChange, editingMode, name, suffix } = props
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
      optionId: e.target.value
    }
    setState(newState)
    onChange(newState)
  }

  const onClear = () => {
    const newState = {
      ...state,
      content: undefined,
      optionId: undefined
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
        value={state.optionId}
        options={field.optionsAttributes.map(o => ({
          label: o.value,
          value: o.id
        }))}
        onChange={handleChange}
      />
      <Button size={"small"} onClick={onClear} shape={"circle"}>
        <RedoOutlined />
      </Button>
    </FieldTypeWrapper>
  )
}

export default RadioField
