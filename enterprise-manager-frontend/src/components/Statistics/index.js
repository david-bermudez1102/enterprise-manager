import React from "react"
import WithLastSixMonths from "../../containers/Records/Statistics/WithLastSixMonths"
import WithMonthYear from "../../containers/Records/Statistics/WithMonthYear"
import WithDateRange from "../../containers/Records/Statistics/WithDateRange"
import { Empty } from "antd"

const Statistics = ({ statistics }) => {
  const { filteredBy, ...restOfProps } = statistics

  if (restOfProps.colors.length === 0) return <Empty />

  switch (filteredBy) {
    case "month_year":
      return <WithMonthYear {...restOfProps} />
    case "date_range":
      return <WithDateRange {...restOfProps} />
    case "with_last_six_months":
      return <WithLastSixMonths {...restOfProps} />
    default:
      return <Empty />
  }
}

export default React.memo(Statistics)
