import React from "react"
import { Row, Col, Statistic } from "antd"
import { useLocation } from "react-router-dom"

const Statistics = ({ resource }) => {
  const location = useLocation()
  return (
    <Row justify='center' gutter={[16, 16]} style={{ textAlign: "center" }}>
      <Col span={8}>
        <Statistic
          title={`Total`}
          value={
            location.pathname.includes("deleted")
              ? resource.deletedRecordsCount
              : resource.recordsCount
          }
        />
      </Col>
      <Col span={8}>
        <Statistic
          title={"This month"}
          value={
            location.pathname.includes("deleted")
              ? resource.currentMonthDeletedRecordsCount
              : resource.currentMonthRecordsCount
          }
        />
      </Col>
      <Col span={8}>
        <Statistic title='Unmerged' value={93} suffix='/ 100' />
      </Col>
    </Row>
  )
}

export default React.memo(Statistics)
