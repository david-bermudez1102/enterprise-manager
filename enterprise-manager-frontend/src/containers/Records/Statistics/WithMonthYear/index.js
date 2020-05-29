import React from "react"
import WithType from "../WithType"
import useWithMonthYear from "./Hooks/useWithMonthYear"

const WithMonthYear = ({ statistics, colors, chartType }) => {
  const data = useWithMonthYear({ statistics, colors })
  return <WithType data={data} chartType={chartType} xAxesLabel={"Date"} />
}

export default React.memo(WithMonthYear)
