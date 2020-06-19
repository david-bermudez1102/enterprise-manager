import React, { useState, useEffect } from "react"
import { Switch, useRouteMatch, useLocation, matchPath } from "react-router-dom"
import Route from "../../../Router/Route"
import { useSelector, shallowEqual } from "react-redux"
import { NoContent } from "../../NoContent"
import Records from ".."
import RecordsResourcesList from "../RecordsPerResource/RecordsResourcesList"
import { Empty } from "antd"

const DeletedRecords = () => {
  const location = useLocation()
  const match = useRouteMatch()
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

  if (resources.length === 0)
    return <Empty>There are no resources created yet!</Empty>

  return (
    <Switch>
      {resource ? (
        <Route
          path={`${match.path}/:formAlias`}
          name={`Deleted ${resource.name}`}>
          <Records resource={resource} deleted />
        </Route>
      ) : null}
      <Route path={match.path} component={RecordsResourcesList} />
    </Switch>
  )
}

export default DeletedRecords
