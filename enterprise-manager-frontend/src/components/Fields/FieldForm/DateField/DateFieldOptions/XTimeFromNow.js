import React from "react"
import { Row, Col, Select, DatePicker, InputNumber } from "antd"
import moment from "moment"

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
    { label: "Next Month", value: "next_month" },
    { label: "Custom date", value: "custom_date" }
  ]

  const { fromTime, timeLength, chosenTime, customDate } =
    fieldState.dateFieldOptionAttributes || {}

  const handleTimeLengthChange = e => {
    onChange({
      ...fieldState,
      dateFieldOptionAttributes: {
        ...fieldState.dateFieldOptionAttributes,
        timeLength: e.target.value
      }
    })
  }

  const handleTimeOptionsChange = chosenTime =>
    onChange({
      ...fieldState,
      dateFieldOptionAttributes: {
        ...fieldState.dateFieldOptionAttributes,
        chosenTime
      }
    })

  const handleFromTimeChange = fromTime => {
    onChange({
      ...fieldState,
      dateFieldOptionAttributes: {
        ...fieldState.dateFieldOptionAttributes,
        fromTime
      }
    })
  }

  const handleCustomDateChange = date => {
    onChange({
      ...fieldState,
      dateFieldOptionAttributes: {
        ...fieldState.dateFieldOptionAttributes,
        customDate: date.toISOString()
      }
    })
  }

  return (
    <Col span={24} order={24}>
      <Row gutter={[16, 16]} style={{ width: "103.28%" }}>
        <Col span={5}>
          <InputNumber
            value={timeLength}
            placeholder={"Time length"}
            style={{ width: "100%" }}
            onBlur={handleTimeLengthChange}
          />
        </Col>
        <Col span={5}>
          <Select
            value={chosenTime}
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
              value={moment(new Date(customDate))}
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
