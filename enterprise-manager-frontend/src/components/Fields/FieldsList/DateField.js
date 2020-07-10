import React from "react"
import { DatePicker } from "antd"
import FieldTypeWrapper from "../FieldTypeWrapper"
import moment from "moment"

const dateFormat = "YYYY/MM/DD"

const DateField = props => {
  const { field, name, editingMode, onChange, suffix, ...newProps } = props

  const handleChange = (date, dateString) => {
    onChange({
      recordFieldId: props.name,
      content: dateString
    })
  }

  return (
    <FieldTypeWrapper
      editingMode={editingMode}
      name={name}
      field={field}
      suffix={suffix}>
      <DatePicker
        {...newProps}
        dropdownAlign={"left"}
        onChange={handleChange}
        defaultValue={moment(new Date(), dateFormat)}
        format={dateFormat}
        style={{ width: "100%" }}
        prefix={suffix}
        picker={"date"}
      />
    </FieldTypeWrapper>
  )
}

export default DateField
