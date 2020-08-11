import React from "react"
import FieldTypeWrapper from "../FieldTypeWrapper"
import TextArea from "antd/lib/input/TextArea"

const TextAreaField = props => {
  const { field, name, editingMode, onChange, suffix, ...newProps } = props

  const handleChange = e => {
    onChange({
      recordFieldId: props.name,
      content: e.target.value
    })
  }

  return (
    <FieldTypeWrapper
      editingMode={editingMode}
      name={name}
      field={field}
      suffix={suffix}>
      <TextArea
        onBlur={handleChange}
        onChange={editingMode ? handleChange : undefined}
        allowClear={!editingMode}
        autoSize
        {...newProps}
      />
    </FieldTypeWrapper>
  )
}

export default React.memo(TextAreaField)
