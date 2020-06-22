import React, { useState, useEffect } from "react"
import RolesForm from "."
import { Col, Card } from "antd"
import Title from "antd/lib/typography/Title"
import { useRouteMatch, useLocation } from "react-router-dom"
import { useSelector, shallowEqual } from "react-redux"
import NoMatch from "../../NoMatch"

const RolesFormLayout = props => {
  const location = useLocation()
  const match = useRouteMatch()
  const { roles } = useSelector(({ roles }) => ({ roles }), shallowEqual)
  const { roleId } = match.params
  const [role, setRole] = useState(
    roles.find(role => parseInt(role.id) === parseInt(roleId))
  )

  useEffect(() => {
    setRole(roles.find(role => parseInt(role.id) === parseInt(roleId)))
  }, [roleId, roles])

  if (location.pathname.includes("edit") && !role) return <NoMatch />

  return (
    <Col span={8} xl={14} lg={16} md={18} sm={24} xs={24}>
      <Card
        bordered={false}
        title={
          <Title level={4}>{role ? <>Edit Role</> : <>New Item</>}</Title>
        }>
        <RolesForm role={role} />
      </Card>
    </Col>
  )
}

export default RolesFormLayout
