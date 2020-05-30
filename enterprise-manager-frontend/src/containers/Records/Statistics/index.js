import React, { useState } from "react"
import { Col, Row, Divider } from "antd"
import { useStatistics } from "./Hooks/useStatistics"
import Statistics from "../../../components/Statistics"
import FilterOptions from "../../../components/Records/RecordsFilter/FilterOptions"

const StatisticsContainer = ({ resource }) => {
  const { filtersApplied, filterData, ...statisticsProps } = useStatistics({
    resource
  })

  const [, setCurrentFilteredBy] = useState()

  return (
    <Col span={24} style={{ position: "relative" }}>
      <Row>
        <Col span={24}>
          <FilterOptions
            filterByMonth={filterData}
            filterByDate={filterData}
            filterByDateRange={filterData}
            filtersApplied={filtersApplied}
            resource={resource}
            setCurrentFilteredBy={setCurrentFilteredBy}
            exclude={["searchRecords"]}
          />
        </Col>
        <Divider />
        <Col span={24}>
          <Statistics statistics={statisticsProps} />
        </Col>
      </Row>
    </Col>
  )
}

export default React.memo(StatisticsContainer)
