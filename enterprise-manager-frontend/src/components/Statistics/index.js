import React from "react"
import WithMonthYear from "../../containers/Records/Statistics/WithMonthYear"
import WithDateRange from "../../containers/Records/Statistics/WithDateRange"
import { Empty, Row, Col } from "antd"
import WithDate from "../../containers/Records/Statistics/WithDate"
import DefaultStatistics from "./DefaultStatistics"

const Statistics = ({ statistics }) => {
  const { filteredBy, ...restOfProps } = statistics

  if (restOfProps.colors.length === 0 || !restOfProps.statistics)
    return <Empty />

  console.log(filteredBy)

  switch (filteredBy) {
    case "month_year":
      return (
        <Row justify={"center"}>
          <Col span={22}>
            <WithMonthYear {...restOfProps} />
          </Col>
        </Row>
      )
    case "date_range":
      return (
        <Row justify={"center"}>
          <Col span={22}>
            <WithDateRange {...restOfProps} />
          </Col>
        </Row>
      )
    case "date":
      return (
        <Row justify={"center"}>
          <Col span={22}>
            <WithDate {...restOfProps} />
          </Col>
        </Row>
      )
    case "with_last_six_months":
      return <DefaultStatistics statistics={statistics} />
    default:
      return <Empty />
  }
}

export default React.memo(Statistics)
