import React, { useEffect } from "react"
import { Switch, useRouteMatch, useLocation } from "react-router-dom"
import Route from "../../Router/Route"
import RolesFormLayout from "../../components/Roles/Form/RolesFormLayout"
import { Card, Row, Col } from "antd"
import Roles from "../../components/Roles"
import { useDispatch, useSelector, shallowEqual } from "react-redux"
import { fetchRoles } from "../../actions/rolesActions"
import PageTabs from "../../components/PageTabs"
import { PlusCircleOutlined, TagsOutlined } from "@ant-design/icons"

const RolesContainer = props => {
  const location = useLocation()
  const match = useRouteMatch()
  const dispatch = useDispatch()

  const { session } = useSelector(({ session }) => ({ session }), shallowEqual)

  useEffect(() => {
    dispatch(fetchRoles(session.currentUser.organizationId))
  }, [location, dispatch, session])

  const tabs = [
    {
      tab: (
        <span>
          <TagsOutlined />
          All Roles
        </span>
      ),
      path: match.url
    },
    {
      tab: (
        <span>
          <PlusCircleOutlined />
          New Role
        </span>
      ),
      path: `${match.url}/new`
    }
  ]

  return (
    <Card bordered={false}>
      <Row gutter={[16, 16]} justify={"center"}>
        <Col span={24}>
          <PageTabs tabs={tabs} />
        </Col>
        <Switch>
          <Route
            name={"Add Role"}
            path={`${match.path}/new`}
            component={RolesFormLayout}
          />
          <Route
            name={"Edit Role"}
            path={`${match.path}/:roleId/edit`}
            component={RolesFormLayout}
          />
          <Route path={match.path} component={Roles} />
        </Switch>
      </Row>
    </Card>
  )
}

export default RolesContainer
