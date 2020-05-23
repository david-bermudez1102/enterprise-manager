import React, { useEffect, useState } from "react"
import { DatePicker, Form } from "antd"
import { useHistory, useLocation } from "react-router-dom"
import moment from "moment"

const dateFormat = "MM/DD/YYYY"

const DateSelector = ({ filterByDate }) => {
  const location = useLocation()
  const history = useHistory()
  const queryParams = new URLSearchParams(location.search)
  const date = queryParams.get("date")
  const [value, setValue] = useState(moment(new Date(date), dateFormat))

  const onChange = (value, dateString) => {
    if (dateString.length > 0)
      history.push({
        path: `${location.pathname}`,
        search: `${location.search.split("&")[0]}&date=${dateString}`
      })
    else
      history.push({
        path: `${location.pathname}`,
        search: `${location.search.split("&")[0]}`
      })
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
    // eslint-disable-next-line
  }, [location])

  return (
    <Form layout='vertical'>
      <Form.Item label='Filter by specific date'>
        <DatePicker
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
