import React from "react"
import { Switch, useRouteMatch } from "react-router-dom"
import Route from "../../Router/Route"
import RolesFormLayout from "../../components/Roles/Form/RolesFormLayout"
import { Card, Row, Col } from "antd"
import Roles from "../../components/Roles"
import PageTabs from "../../components/PageTabs"
import { PlusCircleOutlined, TagsOutlined } from "@ant-design/icons"

const RolesContainer = props => {
  const match = useRouteMatch()

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
