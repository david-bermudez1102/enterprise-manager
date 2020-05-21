import React, { useEffect } from "react"
import { DatePicker } from "antd"
import { useHistory, useLocation } from "react-router-dom"
import moment from "moment"
const { RangePicker } = DatePicker

const dateFormat = "MM/DD/YYYY"

const DateRange = ({ filterByDateRange }) => {
  const location = useLocation()
  const history = useHistory()
  const queryParams = new URLSearchParams(location.search)
  const [startDate, endDate] = (queryParams.get("date_range") || "").split("-")

  const onChange = (value, dateString) => {
    history.push({
      path: `${location.pathname}`,
      search: `${location.search.split("&")[0]}&date_range=${dateString.join(
        "-"
      )}`
    })
  }

  const onOk = value => {
    console.log("onOk: ", value)
  }

  useEffect(() => {
    if (queryParams.get("date_range")) filterByDateRange()
  }, [queryParams])

  const date = new Date()

  return (
    <RangePicker
      defaultValue={[
        moment(
          startDate || new Date(date.getFullYear(), date.getMonth(), 1),
          dateFormat
        ),
        moment(endDate || new Date(), dateFormat)
      ]}
      format={dateFormat}
      onChange={onChange}
      onOk={onOk}
    />
  )
}

export default DateRange
