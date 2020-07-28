import React, { useEffect } from "react"
import { DatePicker } from "antd"
import moment from "moment"
import FieldTypeWrapper from "../../FieldTypeWrapper"
import {
  addMonths,
  addYears,
  addDays,
  addHours,
  addMinutes,
  startOfMonth,
  endOfMonth
} from "date-fns"

const dateFormat = "YYYY/MM/DD"

const DateField = props => {
  const {
    field,
    name,
    editingMode,
    onChange,
    suffix,
    initialValue,
    ...newProps
  } = props
  const { dateFieldOptionAttributes } = field
  const {
    fillWith,
    fromTime,
    timeLength,
    chosenTime,
    customDate,
    updateIfRecordUpdates
  } = dateFieldOptionAttributes || {}

  const handleChange = date => {
    onChange({
      recordFieldId: props.name,
      content: date.toISOString()
    })
  }

  const getDateValue = () => {
    if (fillWith === "x_time_from_x_time") {
      let date
      if (fromTime === "now") date = new Date()
      else if (fromTime === "next_month")
        date = new Date(addMonths(new Date(startOfMonth(new Date())), 1))
      else date = new Date(customDate)
      switch (chosenTime) {
        case "months":
          return addMonths(date, timeLength)
        case "years":
          return addYears(date, timeLength)
        case "days":
          return addDays(date, timeLength)
        case "hours":
          return addHours(date, timeLength)
        case "minutes":
          return addMinutes(date, timeLength)
        default:
          return undefined
      }
    } else if (fillWith === "todays_date") {
      return new Date()
    } else if (fillWith === "first_each_month") {
      return startOfMonth(new Date())
    } else if (fillWith === "fifteenth_each_month") {
      return addDays(startOfMonth(new Date()), 14)
    } else if (fillWith === "first_next_month") {
      return addMonths(startOfMonth(new Date()), 1)
    } else if (fillWith === "fifteenth_next_month") {
      return addDays(addMonths(startOfMonth(new Date()), 1), 14)
    } else if (fillWith === "end_of_month") {
      return endOfMonth(new Date())
    } else if (fillWith === "end_of_next_month") {
      return addMonths(endOfMonth(new Date()), 1)
    } else {
      return false
    }
  }

  useEffect(() => {
    handleChange(new Date(getDateValue()))
    // eslint-disable-next-line
  }, [dateFieldOptionAttributes])

  return (
    <FieldTypeWrapper
      editingMode={editingMode}
      name={name}
      field={field}
      suffix={suffix}>
      <DatePicker
        {...newProps}
        inputReadOnly={field.readOnly}
        dropdownAlign={"left"}
        onChange={!field.readOnly ? handleChange : undefined}
        defaultValue={
          !editingMode
            ? getDateValue() !== false && !field.readOnly
              ? moment(new Date(getDateValue()), dateFormat)
              : undefined
            : !field.readOnly || !updateIfRecordUpdates
            ? moment(new Date(initialValue), dateFormat)
            : undefined
        }
        value={
          !editingMode
            ? getDateValue() !== false && field.readOnly
              ? moment(new Date(getDateValue()), dateFormat)
              : undefined
            : updateIfRecordUpdates
            ? field.readOnly
              ? moment(new Date(getDateValue()), dateFormat)
              : undefined
            : field.readOnly
            ? moment(new Date(initialValue), dateFormat)
            : undefined
        }
        format={dateFormat}
        style={{ width: "100%" }}
        prefix={suffix}
        picker={"date"}
        allowClear={!field.readOnly}
      />
    </FieldTypeWrapper>
  )
}

export default DateField
