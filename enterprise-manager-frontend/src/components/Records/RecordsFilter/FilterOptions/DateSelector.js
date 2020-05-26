import React, { useEffect, useState } from "react"
import { DatePicker, Form } from "antd"
import { useHistory, useLocation } from "react-router-dom"
import moment from "moment"

const dateFormat = "MM/DD/YYYY"

const DateSelector = ({ filterByDate, setCurrentFilteredBy }) => {
  const location = useLocation()
  const history = useHistory()
  const queryParams = new URLSearchParams(location.search)
  const date = queryParams.get("date")
  const [value, setValue] = useState(moment(new Date(date), dateFormat))

  const onChange = (value, dateString) => {
    if (dateString.length > 0)
      history.push({
        path: `${location.pathname}`,
        search: `date=${dateString}`
      })
    else history.push(location.pathname)
  }

  const onOk = value => {
    console.log("onOk: ", value)
  }

  useEffect(() => {
    if (date) {
      filterByDate()
      setValue(moment(new Date(date), dateFormat))
    } else {
      setValue(undefined)
    }
    // eslint-disable-next-line
  }, [date])

  useEffect(() => {
    if (queryParams.get("date"))
      setCurrentFilteredBy(`on ${value.format(dateFormat)}`)
  }, [value])

  return (
    <Form layout='vertical'>
      <Form.Item help='Filter by specific date'>
        <DatePicker
          style={{
            border: date ? "1px solid #1890ff" : undefined
          }}
          allowClear={false}
          value={value}
          format={dateFormat}
          onChange={onChange}
          onOk={onOk}
          on
        />
      </Form.Item>
    </Form>
  )
}

export default DateSelector
