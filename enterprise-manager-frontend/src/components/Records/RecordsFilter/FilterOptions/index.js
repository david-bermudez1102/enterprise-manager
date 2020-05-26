import React from "react"
import DateRange from "./DateRange"
import { Col, Row } from "antd"
import MonthYear from "./MonthYear"
import DateSelector from "./DateSelector"
import SearchRecords from "./SearchRecords"
import ClearFilters from "./ClearFilters"

const FilterOptions = props => {
  return (
    <Col span={24}>
      <Row gutter={[16]} justify={"space-between"}>
        <Col>
          <ClearFilters {...props} />
        </Col>
        <Col>
          <MonthYear {...props} />
        </Col>
        <Col>
          <DateRange {...props} />
        </Col>
        <Col>
          <DateSelector {...props} />
        </Col>
        <Col>
          <SearchRecords {...props} />
        </Col>
      </Row>
    </Col>
  )
}

export default React.memo(FilterOptions)
