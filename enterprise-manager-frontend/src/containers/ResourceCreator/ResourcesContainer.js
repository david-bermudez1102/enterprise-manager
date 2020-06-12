import React, { useState, useEffect } from "react"
import { Switch, useLocation, useRouteMatch, matchPath } from "react-router-dom"
import { useSelector, shallowEqual } from "react-redux"
import ResourcesList from "../../components/Resources/ResourcesList"
import Resource from "../../components/Resources/Resource"
import ResourceDelete from "../../components/Resources/ResourceDelete"
import Route from "../../Router/Route"
import { Row } from "antd"
import ResourceFormLayout from "../../components/Resources/ResourceFormLayout/index.js"

const ResourcesContainer = props => {
  const { loaded, loading } = props
  const location = useLocation()
  const match = useRouteMatch()
  const { resources } = useSelector(
    ({ resources }) => ({ resources }),
    shallowEqual
  )

  const { organizationId } = match.params

  const path = matchPath(location.pathname, {
    path: [`${match.url}/:formAlias/edit`, `${match.url}/:formAlias`]
  })
  const { params } = path || {}
  const { formAlias } = params || {}

  const [resource, setResource] = useState(
    resources.find(resource => resource.formAlias === formAlias)
  )

  useEffect(() => {
    setResource(resources.find(resource => resource.formAlias === formAlias))
    // eslint-disable-next-line
  }, [formAlias, resources])

  return (
    <Row gutter={[16, 16]}>
      <Switch>
        <Route path={`${match.path}/new`} name={"New Resource"}>
          <ResourceFormLayout title={"Create Resource"} />
        </Route>
        <Route path={`${match.path}/:formAlias/edit`} name={"Edit Resource"}>
          <ResourceFormLayout title={"Update Resource"} resource={resource} />
        </Route>
        <Route path={`${match.path}/:resourceId/delete`}>
          <ResourceDelete
            redirectTo={match.url}
            organizationId={organizationId}
          />
        </Route>
        )} />
        {resource ? (
          <Route path={`${match.path}/:formAlias`} name={resource.name}>
            <Resource resource={resource} />
          </Route>
        ) : null}
        <Route path={match.path}>
          <ResourcesList loaded={loaded} loading={loading} />
        </Route>
      </Switch>
    </Row>
  )
}

export default ResourcesContainer
