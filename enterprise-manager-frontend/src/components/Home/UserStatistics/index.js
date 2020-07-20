import React from "react"
import { Statistic, Row, Col } from "antd"
import IconWrapper from "../../Icons/IconWrapper"
import { blue, volcano } from "@ant-design/colors"

const UserStatistics = () => {
  return (
    <div>
      <Row gutter={[48, 48]}>
        <Col>
          <Statistic
            prefix={
              <IconWrapper
                className={"fal fa-comments-alt"}
                style={{ color: blue.primary }}
              />
            }
            value={5}
          />
        </Col>
        <Col>
          <Statistic
            prefix={
              <IconWrapper
                className={"fal fa-bullhorn"}
                style={{ color: volcano.primary }}
              />
            }
            value={10}
          />
        </Col>
        <Col>
          <Statistic
            prefix={<IconWrapper className={"fal fa-tasks"} />}
            value={10}
          />
        </Col>
      </Row>
    </div>
  )
}

export default UserStatistics
