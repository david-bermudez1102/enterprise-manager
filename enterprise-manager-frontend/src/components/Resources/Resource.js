import React, { useEffect } from "react"
import FieldsContainer from "../../containers/Fields/FieldsContainer"
import { useDispatch, useSelector, shallowEqual } from "react-redux"
import { fetchFields } from "../../actions/fieldActions"
import { fetchRecordFields } from "../../actions/recordFieldActions"
import RecordsContainer from "../../containers/Records/RecordsContainer"
import { useRouteMatch, useLocation, Switch, Link } from "react-router-dom"
import Route from "../../Router/Route"
import ResourceSettings from "./ResourceSettings"
import ResourceShow from "./ResourceShow/index"
import { Col } from "antd"
import PageTabs from "../PageTabs"
import { singular, plural } from "pluralize"
import {
  AppstoreAddOutlined,
  TableOutlined,
  FundViewOutlined,
  SettingOutlined,
  FormOutlined
} from "@ant-design/icons"

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
    {
      path: `${match.url}/records`,
      tab: (
        <span>
          <TableOutlined />
          View All {plural(resource.name)}
        </span>
      )
    },
    {
      path: `${match.url}/statistics`,
      tab: (
        <span>
          <FundViewOutlined />
          View Statistics
        </span>
      )
    },
    {
      path: `${match.url}/new/fields/new`,
      tab: (
        <span>
          <FormOutlined />
          Add Field
        </span>
      )
    },
    {
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
      <Col span={24}>
        <PageTabs tabs={tabs} />
      </Col>
      <Switch>
        <Route path={`${match.path}/settings`} name={"Settings"}>
          <ResourceSettings resource={resource} />
        </Route>

        <Route path={`${match.path}/records`} name={"All Records"}>
          <RecordsContainer match={match} resource={resource} />
        </Route>
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
