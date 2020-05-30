import React from "react"
import DateRange from "./DateRange"
import { Col, Row } from "antd"
import MonthYear from "./MonthYear"
import DateSelector from "./DateSelector"
import SearchRecords from "./SearchRecords"
import ClearFilters from "./ClearFilters"

const FilterOptions = props => {
  const { exclude } = props
  const filters = {
    clearFilters: <ClearFilters {...props} />,
    monthYear: <MonthYear {...props} />,
    dateRange: <DateRange {...props} />,
    dateSelector: <DateSelector {...props} />,
    searchRecords: <SearchRecords {...props} />
  }
  return (
    <Col span={24}>
      <Row gutter={[16]} justify={"space-between"}>
        {Object.entries(filters).map(([key, f]) =>
          !(exclude || []).includes(key) ? <Col>{f}</Col> : null
        )}
      </Row>
    </Col>
  )
}

export default React.memo(FilterOptions)
