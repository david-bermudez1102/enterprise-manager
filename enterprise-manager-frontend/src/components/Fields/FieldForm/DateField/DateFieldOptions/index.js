import React from "react"
import { Select, Col, Form } from "antd"
import XTimeFromNow from "./XTimeFromNow"

const DateFieldOptions = ({ fieldState, onChange }) => {
  const options = [
    { label: "User Input", value: "user_input" },
    { label: "Today's Date", value: "todays_date" },
    { label: "X time from X time", value: "x_time_from_x_time" }
  ]

  const handleChange = fillWith => {
    onChange({
      ...fieldState,
      dateFieldOptionAttributes: {
        ...fieldState.dateFieldOptionAttributes,
        fillWith
      }
    })
  }

  return (
    <>
      <Col span={24} order={24}>
        <Form.Item label={"Fill Date with:"} style={{ marginBottom: 0 }}>
          <Select
            options={options}
            placeholder={"Select an option"}
            onChange={handleChange}
          />
        </Form.Item>
      </Col>
      <XTimeFromNow onChange={onChange} fieldState={fieldState} />
    </>
  )
}

export default DateFieldOptions
