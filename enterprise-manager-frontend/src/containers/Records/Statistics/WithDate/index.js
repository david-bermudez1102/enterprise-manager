import React from "react"
import WithType from "../WithType"
import useWithDate from "./Hooks/useWithDate"

const WithDate = ({ statistics, colors, chartType }) => {
  const data = useWithDate({ statistics, colors })
  return <WithType data={data} chartType={chartType} xAxesLabel={"Hour"} />
}

export default React.memo(WithDate)
