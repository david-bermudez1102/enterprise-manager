import React, { useState } from "react"
import { Row, Col, Select, DatePicker, InputNumber } from "antd"
import { format } from "date-fns"

const XTimeFromNow = ({ onChange, fieldState }) => {
  const timeOptions = [
    { label: "Month(s)", value: "months" },
    { label: "Day(s)", value: "days" },
    { label: "Year(s)", value: "years" },
    { label: "Hour(s)", value: "hours" },
    { label: "Minute(s)", value: "minutes" }
  ]

  const fromTimeOptions = [
    { label: "Now", value: "now" },
    { label: "Zoho creation date", value: "zoho_creation_date" },
    { label: "Custom date", value: "custom_date" }
  ]

  const [fromTime, setFromTime] = useState()

  const handleTimeLengthChange = e => {
    onChange({
      ...fieldState,
      dateFieldOptionAttributes: {
        ...fieldState.dateFieldOptionAttributes,
        timeLength: e.target.value
      }
    })
  }

  const handleTimeOptionsChange = timeChosen =>
    onChange({
      ...fieldState,
      dateFieldOptionAttributes: {
        ...fieldState.dateFieldOptionAttributes,
        timeChosen
      }
    })

  const handleFromTimeChange = fromTime => {
    setFromTime(fromTime)
    onChange({
      ...fieldState,
      dateFieldOptionAttributes: {
        ...fieldState.dateFieldOptionAttributes,
        fromTime
      }
    })
  }

  const handleCustomDateChange = (date, customDate) => {
    onChange({
      ...fieldState,
      dateFieldOptionAttributes: {
        ...fieldState.dateFieldOptionAttributes,
        customDate: format(new Date(customDate), "yyyy-MM-dd")
      }
    })
  }

  return (
    <Col span={24} order={24}>
      <Row gutter={16} style={{ width: "103.28%" }}>
        <Col span={5}>
          <InputNumber
            placeholder={"Time length"}
            style={{ width: "100%" }}
            onBlur={handleTimeLengthChange}
          />
        </Col>
        <Col span={5}>
          <Select
            options={timeOptions}
            placeholder={"Select"}
            onChange={handleTimeOptionsChange}
          />
        </Col>
        <Col
          flex={"auto"}
          style={{ display: "flex", flexWrap: "nowrap", alignItems: "center" }}>
          From
          <Select
            style={{ marginLeft: 5, width: "100%" }}
            placeholder={"Select"}
            options={fromTimeOptions}
            onChange={handleFromTimeChange}
            value={fromTime}
          />
        </Col>
        {fromTime === "custom_date" && (
          <Col span={7}>
            <DatePicker
              style={{ width: "100%" }}
              onChange={handleCustomDateChange}
              format={"MM/DD/YYYY"}
            />
          </Col>
        )}
      </Row>
    </Col>
  )
}

export default XTimeFromNow
