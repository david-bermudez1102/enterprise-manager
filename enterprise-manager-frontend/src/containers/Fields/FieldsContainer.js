import React from "react"
import { Switch, useLocation } from "react-router-dom"
import { updateField } from "../../actions/fieldActions"
import FieldDelete from "../../components/Fields/FieldDelete"
import FieldsList from "../../components/Fields/FieldsList/FieldsList"
import Route from "../../Router/Route"
import { Col, Row, Card } from "antd"
import FieldFormLayout from "../../components/Fields/FieldFormLayout"
import { singular } from "pluralize"
import useUserPermission from "../../components/Accounts/UserPermission/useUserPermission"

const FieldsContainer = props => {
  const { match, organizationId, resource, fields } = props
  const location = useLocation()

  const permissions = useUserPermission({ payload: resource })

  return (
    <Col span={24}>
      <Card bordered={false} bodyStyle={{ padding: 0, margin: 0 }}>
        <Row justify={"center"}>
          <Switch>
            {permissions.canCreate && (
              <Route path={`${match.path}/new/fields/new`} name={"Add Field"}>
                <FieldFormLayout
                  resource={resource}
                  organizationId={organizationId}
                />
              </Route>
            )}
            {permissions.canUpdate && (
              <Route path={`${match.path}/new/fields/:fieldId/delete`}>
                <FieldDelete fields={fields} redirectTo={match.url} />
              </Route>
            )}
            {permissions.canUpdate && (
              <Route path={`${match.path}/new/fields/:fieldId/edit`}>
                <FieldFormLayout
                  resource={resource}
                  organizationId={organizationId}
                />
              </Route>
            )}
          </Switch>
          <Route
            path={`${match.path}/new`}
            name={`New ${singular(resource.name)}`}>
            <Col
              span={24}
              {...(location.pathname !== `${match.url}/new`
                ? { xxl: 12, xl: 10, lg: 12 }
                : { xxl: 8, xl: 10, lg: 14, md: 16 })}>
              <FieldsList
                fields={fields}
                match={match}
                resource={resource}
                updateField={updateField}
              />
            </Col>
          </Route>
        </Row>
      </Card>
    </Col>
  )
}

export default FieldsContainer
