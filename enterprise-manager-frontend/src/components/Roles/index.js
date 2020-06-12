import React from "react"
import { Col } from "antd"
import RolesList from "./List"

const Roles = props => {
  return (
    <Col span={8} xl={10} lg={14} md={18} sm={24} xs={24}>
      <RolesList />
    </Col>
  )
}

export default Roles
