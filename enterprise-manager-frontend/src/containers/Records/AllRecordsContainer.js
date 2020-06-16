import React, { useState, useEffect } from "react"
import { Switch, useLocation, useRouteMatch, matchPath } from "react-router-dom"
import RecordsResourcesList from "../../components/Records/RecordsPerResource/RecordsResourcesList"
import { useSelector, shallowEqual, useDispatch } from "react-redux"
import Route from "../../Router/Route"
import Records from "../../components/Records"
import DeletedRecords from "../../components/Records/DeletedRecords.js"
import { fetchFields } from "../../actions/fieldActions"
import { fetchRecordFields } from "../../actions/recordFieldActions"
import { Empty, Col } from "antd"
import AddResourceButton from "../../components/Resources/AddResourceButton"

const AllRecordsContainer = () => {
  const location = useLocation()
  const match = useRouteMatch()
  const dispatch = useDispatch()
  const path = matchPath(location.pathname, {
    path: `${match.path}/:formAlias`
  })
  const { params } = path || {}
  const { formAlias } = params || {}
  const { resources } = useSelector(
    ({ resources }) => ({ resources }),
    shallowEqual
  )
  const [resource, setResource] = useState(
    resources.find(resource => resource.formAlias === formAlias)
  )

  useEffect(() => {
    setResource(resources.find(resource => resource.formAlias === formAlias))
  }, [resources, formAlias, location])

  useEffect(() => {
    if (resource) {
      dispatch(fetchFields(resource.organizationId, resource.id))
      dispatch(fetchRecordFields(resource.organizationId, resource.id))
    }
  }, [resource, dispatch])

  if (resources.length === 0)
    return (
      <Col span={24}>
        <Empty description={"There are no resources created yet."}>
          <AddResourceButton />
        </Empty>
      </Col>
    )

  return (
    <>
      <Switch>
        <Route
          path={`${match.url}/deleted`}
          name={"Deleted Records"}
          component={DeletedRecords}
        />
        {resource ? (
          <Route path={`${match.path}/:formAlias`} name={resource.name}>
            <Records resource={resource} />
          </Route>
        ) : null}
        <Route path={match.path} component={RecordsResourcesList} />
      </Switch>
    </>
  )
}

export default AllRecordsContainer
