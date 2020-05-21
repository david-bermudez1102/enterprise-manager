import React, { useEffect } from "react"
import { DatePicker } from "antd"
import { useHistory, useLocation } from "react-router-dom"
import moment from "moment"

const dateFormat = "MMMM YYYY"

const MonthYear = ({ filterByMonth }) => {
  const location = useLocation()
  const history = useHistory()
  const queryParams = new URLSearchParams(location.search)
  const [month, year] = (queryParams.get("month_year") || "").split("/")

  const onChange = value => {
    history.push({
      path: `${location.pathname}`,
      search: `${location.search.split("&")[0]}&month_year=${
        value.month() + 1
      }/${value.year()}`
    })
  }

  const onOk = value => {
    console.log("onOk: ", value)
  }

  useEffect(() => {
    if ((month, year)) filterByMonth()
  }, [month, year])

  const date = new Date()

  return (
    <DatePicker
      defaultValue={moment(
        new Date(year || date.getFullYear(), month - 1 || date.getMonth()),
        dateFormat
      )}
      format={dateFormat}
      onChange={onChange}
      onOk={onOk}
      picker={"month"}
    />
  )
}

export default MonthYear
