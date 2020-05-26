import React, { useEffect, useState } from "react"
import { DatePicker, Form } from "antd"
import { useHistory, useLocation } from "react-router-dom"
import moment from "moment"
const { RangePicker } = DatePicker

const dateFormat = "MMMM Do YYYY"

const DateRange = ({ filterByDateRange, resource, setCurrentFilteredBy }) => {
  const location = useLocation()
  const history = useHistory()
  const queryParams = new URLSearchParams(location.search)
  const [startDate, endDate] = (queryParams.get("date_range") || "").split("-")

  const date = new Date()
  const [value, setValue] = useState([
    moment(startDate || new Date(date.getFullYear(), date.getMonth(), 1)),
    moment(endDate || new Date(resource.lastRecordDate))
  ])

  const onChange = (value, dateString) => {
    if (value)
      history.push({
        path: `${location.pathname}`,
        search: `date_range=${value.map(d => d.format("MM/DD/YYYY")).join("-")}`
      })
  }

  const onOk = value => {
    console.log("onOk: ", value)
  }

  useEffect(() => {
    if (startDate && endDate) filterByDateRange()
    // eslint-disable-next-line
  }, [startDate, endDate])

  useEffect(() => {
    setValue([
      moment(startDate || new Date(date.getFullYear(), date.getMonth(), 1)),
      moment(endDate || new Date(resource.lastRecordDate))
    ])
    // eslint-disable-next-line
  }, [location])

  useEffect(() => {
    if (queryParams.get("date_range"))
      setCurrentFilteredBy(
        `from ${value[0].format(dateFormat)} to ${value[1].format(dateFormat)}`
      )
  }, [value])

  return (
    <Form layout='vertical'>
      <Form.Item help='Filter by date range'>
        <RangePicker
          style={{
            border: startDate && endDate ? "1px solid #1890ff" : undefined
          }}
          allowClear={false}
          value={value}
          format={dateFormat}
          onChange={onChange}
          onOk={onOk}
        />
      </Form.Item>
    </Form>
  )
}

export default DateRange
