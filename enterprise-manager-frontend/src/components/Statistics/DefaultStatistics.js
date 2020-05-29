import React, { useEffect } from "react"
import WithLastSixMonths from "../../containers/Records/Statistics/WithLastSixMonths"
import WithMonthYear from "../../containers/Records/Statistics/WithMonthYear"
import { Row, Col } from "antd"
import { useStatistics } from "../../containers/Records/Statistics/Hooks/useStatistics"
import { useLocation } from "react-router-dom"

const DefaultStatistics = ({ statistics }) => {
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)

  const { filteredBy, resource, ...restOfProps } = statistics

  const currentDate = new Date()

  const { filtersApplied, filterData, ...statisticsProps } = useStatistics({
    resource,
    customParams: `${location.search}&month_year=${
      currentDate.getMonth() + 1
    }/${currentDate.getFullYear()}`
  })

  useEffect(() => {
    filterData()
    // eslint-disable-next-line
  }, [])

  console.log(statisticsProps)

  return (
    <Row>
      <Col span={12}>
        <WithLastSixMonths
          {...restOfProps}
          chartType={queryParams.get("chart_type") || "bar"}
        />
      </Col>
      <Col span={12}>
        <WithMonthYear {...statisticsProps} />
      </Col>
    </Row>
  )
}

export default React.memo(DefaultStatistics)
