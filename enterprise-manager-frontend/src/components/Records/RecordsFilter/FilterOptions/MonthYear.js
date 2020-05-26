import React, { useEffect, useState } from "react"
import { DatePicker, Form } from "antd"
import { useHistory, useLocation } from "react-router-dom"
import moment from "moment"

const dateFormat = "MMMM YYYY"

const MonthYear = ({ filterByMonth, setCurrentFilteredBy }) => {
  const location = useLocation()
  const history = useHistory()
  const queryParams = new URLSearchParams(location.search)
  const [month, year] = (queryParams.get("month_year") || "").split("/")

  const [value, setValue] = useState(
    moment(month && year ? new Date(year, month - 1) : new Date(), dateFormat)
  )

  const onChange = value => {
    if (value)
      history.push({
        path: `${location.pathname}`,
        search: `month_year=${value.month() + 1}/${value.year()}`
      })
    else
      history.push({
        path: `${location.pathname}`
      })
  }

  const onOk = value => {
    console.log("onOk: ", value)
  }

  useEffect(() => {
    if (month && year) filterByMonth()

    // eslint-disable-next-line
  }, [month, year])

  useEffect(() => {
    setValue(
      moment(month && year ? new Date(year, month - 1) : new Date(), dateFormat)
    )
    // eslint-disable-next-line
  }, [location])

  useEffect(() => {
    if (queryParams.get("month_year"))
      setCurrentFilteredBy(`for ${value.format(dateFormat)}`)
    // eslint-disable-next-line
  }, [value])

  return (
    <Form
      layout='vertical'
      style={{
        color: month && year ? "#1890ff" : undefined
      }}>
      <Form.Item help={"Filter by month"}>
        <DatePicker
          allowClear={false}
          style={{
            border: month && year ? "1px solid #1890ff" : undefined
          }}
          value={value}
          format={dateFormat}
          onChange={onChange}
          onOk={onOk}
          picker={"month"}
        />
      </Form.Item>
    </Form>
  )
}

export default MonthYear
