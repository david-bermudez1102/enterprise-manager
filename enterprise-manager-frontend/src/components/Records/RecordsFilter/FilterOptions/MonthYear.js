import React, { useEffect, useState } from "react"
import { DatePicker } from "antd"
import { useHistory, useLocation } from "react-router-dom"
import moment from "moment"
import { useDispatch } from "react-redux"

const dateFormat = "MMMM YYYY"

const MonthYear = ({ filterByMonth }) => {
  const location = useLocation()
  const history = useHistory()
  const queryParams = new URLSearchParams(location.search)
  const [month, year] = (queryParams.get("month_year") || "").split("/")
  const [value, setValue] = useState(
    moment(month && year ? new Date(year, month - 1) : new Date(), dateFormat)
  )

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
    if (month && year) filterByMonth()
  }, [month, year])

  useEffect(() => {
    setValue(
      moment(month && year ? new Date(year, month - 1) : new Date(), dateFormat)
    )
  }, [location])

  return (
    <DatePicker
      value={value}
      format={dateFormat}
      onChange={onChange}
      onOk={onOk}
      picker={"month"}
    />
  )
}

export default MonthYear
