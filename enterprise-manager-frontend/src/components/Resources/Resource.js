import React, { useEffect } from "react"
import FieldsContainer from "../../containers/Fields/FieldsContainer"
import { useDispatch, useSelector, shallowEqual } from "react-redux"
import { fetchFields } from "../../actions/fieldActions"
import { fetchRecordFields } from "../../actions/recordFieldActions"
import RecordsContainer from "../../containers/Records/RecordsContainer"
import { useRouteMatch, useLocation, Switch } from "react-router-dom"
import Route from "../../Router/Route"
import ResourceSettings from "./ResourceSettings"
import ResourceShow from "./ResourceShow/index"
import { Col, Card } from "antd"
import PageTabs from "../PageTabs"
import { singular, plural } from "pluralize"
import {
  AppstoreAddOutlined,
  TableOutlined,
  FundViewOutlined,
  SettingOutlined,
  FormOutlined
} from "@ant-design/icons"
import StatisticsContainer from "../../containers/Records/Statistics"
import ConnectionsContainer from "../../containers/Connections/ConnectionsContainer"
import useUserPermission from "../Accounts/UserPermission/useUserPermission"
import ResourceWebSocket from "../WebSockets/ResourceWebSocket"

const Resource = () => {
  const location = useLocation()
  const match = useRouteMatch()

  const { resources, fields } = useSelector(
    ({ resources, fields }) => ({ resources, fields }),
    shallowEqual
  )

  const resource = resources.find(
    resource => resource.formAlias === match.params.formAlias
  )

  const dispatch = useDispatch()

  const resourcePermissions = useUserPermission({ payload: resource })

  useEffect(() => {
    if (resource) {
      dispatch(fetchFields(resource.organizationId, resource.id))
      dispatch(fetchRecordFields(resource.organizationId, resource.id))
    }
  }, [resource, dispatch])

  const tabs = [
    {
      path: `${match.url}/new`,
      tab: (
        <span>
          <AppstoreAddOutlined />
          New {singular(resource.name)}
        </span>
      )
    },
    resourcePermissions.canRead && {
      path: `${match.url}/records`,
      tab: (
        <span>
          <TableOutlined />
          View All {plural(resource.name)}
        </span>
      )
    },
    resourcePermissions.canRead && {
      path: `${match.url}/statistics`,
      tab: (
        <span>
          <FundViewOutlined />
          View Statistics
        </span>
      )
    },
    resourcePermissions.canCreate && {
      path: `${match.url}/new/fields/new`,
      tab: (
        <span>
          <FormOutlined />
          Add Field
        </span>
      )
    },
    resourcePermissions.canUpdate && {
      path: `${match.url}/settings`,
      tab: (
        <span>
          <SettingOutlined />
          Settings
        </span>
      )
    }
  ]

  return resource ? (
    <>
      <ResourceWebSocket resourceId={resource.id} />
      <Col span={24} style={{ marginBottom: -24 }}>
        <Card
          bordered={false}
          bodyStyle={{ paddingTop: 0, paddingBottom: 0, margin: 0 }}>
          <PageTabs tabs={tabs} permission={resourcePermissions} />
        </Card>
      </Col>
      <Switch>
        <Route path={`${match.path}/settings`} name={"Settings"}>
          <ResourceSettings resource={resource} />
        </Route>
        <Route path={`${match.path}/statistics`} name={"Statistics"}>
          <StatisticsContainer resource={resource} />
        </Route>

        <Route path={`${match.path}/records`} name={"All Records"}>
          <RecordsContainer match={match} resource={resource} />
        </Route>
        <Route
          path={`${match.path}/connections`}
          render={props => (
            <ConnectionsContainer {...props} resources={resources} />
          )}
        />
        <Route path={`${match.path}`}>
          <FieldsContainer
            match={match}
            organizationId={resource.organizationId}
            resource={resource}
            fields={fields[resource.id] || []}
            location={location}
          />
        </Route>
      </Switch>
      <Route exact path={match.path}>
        <ResourceShow resource={resource} />
      </Route>
    </>
  ) : null
}
export default React.memo(Resource)
