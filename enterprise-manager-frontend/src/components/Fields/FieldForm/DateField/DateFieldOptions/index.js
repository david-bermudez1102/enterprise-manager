import React from "react"
import { Select, Col, Form, Checkbox, Tooltip } from "antd"
import XTimeFromNow from "./XTimeFromNow"
import { QuestionCircleOutlined } from "@ant-design/icons"

const DateFieldOptions = ({ fieldState, onChange }) => {
  const options = [
    { label: "User Input", value: "user_input" },
    { label: "Today's Date", value: "todays_date" },
    { label: "The 1st of each month", value: "first_each_month" },
    { label: "The 15th of each month", value: "fifteenth_each_month" },
    { label: "The 1st of next month", value: "first_next_month" },
    { label: "The 15th of next month", value: "fifteenth_next_month" },
    { label: "End of current month", value: "end_of_month" },
    { label: "End of next month", value: "end_of_next_month" },
    { label: "X time from X time", value: "x_time_from_x_time" }
  ]

  const handleChange = fillWith => {
    onChange({
      ...fieldState,
      ableToBeReadOnly: fillWith !== "user_input",
      ableToHideInForm: fillWith !== "user_input",
      dateFieldOptionAttributes: {
        ...fieldState.dateFieldOptionAttributes,
        fillWith
      }
    })
  }

  const { fillWith } = fieldState.dateFieldOptionAttributes || {
    fillWith: "user_input"
  }

  return (
    <>
      <Col span={24} order={24}>
        <Form.Item label={"Fill Date with"} style={{ marginBottom: 0 }}>
          <Select
            value={fillWith}
            options={options}
            placeholder={"Select an option"}
            onChange={handleChange}
          />
        </Form.Item>
      </Col>
      {fillWith === "x_time_from_x_time" && (
        <XTimeFromNow onChange={onChange} fieldState={fieldState} />
      )}
      <Col span={24} order={24}>
        <Checkbox
          onChange={e =>
            onChange({
              ...fieldState,
              dateFieldOptionAttributes: {
                ...fieldState.dateFieldOptionAttributes,
                updateIfRecordUpdates: e.target.checked
              }
            })
          }>
          Change date when other values change?
        </Checkbox>
        <Tooltip
          title={
            <>
              If true, whenever there is a change on a record created, the date
              will also be updated. eg. The field is setup to be autofilled with
              today's date and the record is created on 01/01/2040. If it's
              modified on 01/02/2040, then the date will be autofilled with
              01/02/2040.
            </>
          }
          destroyTooltipOnHide>
          <QuestionCircleOutlined style={{ float: "right" }} />
        </Tooltip>
      </Col>
    </>
  )
}

export default DateFieldOptions
