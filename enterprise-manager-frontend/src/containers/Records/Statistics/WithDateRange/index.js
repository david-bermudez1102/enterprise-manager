import React from "react"
import WithType from "../WithType"
import useDateRange from "./Hooks/useDateRange"

const WithDateRange = ({ statistics, colors, chartType }) => {
  const data = useDateRange({ statistics, colors })
  return <WithType data={data} chartType={chartType} />
}

export default React.memo(WithDateRange)
