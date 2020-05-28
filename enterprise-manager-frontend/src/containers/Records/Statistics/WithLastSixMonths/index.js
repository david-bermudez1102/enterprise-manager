import React from "react"
import WithType from "../WithType"
import useLastSixMonths from "./Hooks/useLastSixMonths"

const WithLastSixMonths = ({ statistics, colors, chartType }) => {
  const data = useLastSixMonths({ statistics, colors })
  return <WithType data={data} chartType={chartType} />
}

export default WithLastSixMonths
