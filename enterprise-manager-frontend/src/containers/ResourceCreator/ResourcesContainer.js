import React, { useState, useEffect } from "react";
import {
  Switch,
  useLocation,
  useRouteMatch,
  matchPath,
} from "react-router-dom";
import { useSelector, shallowEqual } from "react-redux";
import ResourcesList from "../../components/Resources/ResourcesList";
import Resource from "../../components/Resources/Resource";
import ResourceDelete from "../../components/Resources/ResourceDelete";
import ConnectionsContainer from "../Connections/ConnectionsContainer";
import Route from "../../Router/Route";
import { Row, Col } from "antd";
import ResourceFormLayout from "../../components/Resources/ResourceFormLayout/index.js";

const ResourcesContainer = props => {
  const { loaded, loading } = props;
  const location = useLocation();
  const match = useRouteMatch();
  const { resources } = useSelector(
    ({ resources }) => ({ resources }),
    shallowEqual
  );

  const { organizationId } = match.params;
  const isFieldsPath = location.pathname.includes("fields");

  const path = matchPath(location.pathname, {
    path: `${match.path}/:formAlias/edit`,
  });
  const { params } = path || {};
  const { formAlias } = params || {};

  const [resource, setResource] = useState(
    resources.find(resource => resource.formAlias === formAlias)
  );

  useEffect(() => {
    setResource(resources.find(resource => resource.formAlias === formAlias));
  }, [resources, formAlias]);

  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <ResourcesList loaded={loaded} loading={loading} />
      </Col>
      <Switch>
        <Route path={`${match.path}/new`}>
          <ResourceFormLayout title={"Create Resource"} />
        </Route>
        {resource ? (
          <Route path={`${match.path}/:formAlias/edit`}>
            <ResourceFormLayout title={"Update Resource"} resource={resource} />
          </Route>
        ) : null}
        {resources.length > 0 ? (
          <Route
            path={`${match.path}/:formAlias/connections`}
            render={props => (
              <ConnectionsContainer {...props} resources={resources} />
            )}
          />
        ) : null}
        <Route path={`${match.path}/:resourceId/delete`}>
          <ResourceDelete
            redirectTo={match.url}
            organizationId={organizationId}
          />
        </Route>
        )} />
        {resources.length > 0 ? (
          <Route path={`${match.path}/:formAlias`}>
            <Resource isFieldsPath={isFieldsPath} />
          </Route>
        ) : null}
      </Switch>
    </Row>
  );
};

export default React.memo(ResourcesContainer);
