import React, { useState, useEffect } from "react";
import ResourceForm from "../../components/ResourceCreator/ResourceForm";
import {
  Switch,
  useLocation,
  useRouteMatch,
  matchPath,
} from "react-router-dom";
import { useSelector, shallowEqual } from "react-redux";
import { addResource, updateResource } from "../../actions/resourceActions";
import ResourcesList from "../../components/Resources/ResourcesList";
import Resource from "../../components/Resources/Resource";
import ResourceDelete from "../../components/Resources/ResourceDelete";
import ConnectionsContainer from "../Connections/ConnectionsContainer";
import Route from "../../Router/Route";
import { Row, Col, Card } from "antd";
import Title from "antd/lib/typography/Title";

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
    <>
      <Row gutter={[16, 16]}>
        <Col lg={!isFieldsPath ? 12 : 8} sm={24}>
          <ResourcesList loaded={loaded} loading={loading} />
        </Col>
        <Switch>
          <Route path={`${match.path}/new`}>
            <Col lg={12} sm={24}>
              <Card
                size={"small"}
                title={
                  <Title level={3} style={{ marginBottom: 0 }}>
                    <i className="fas fa-layer-plus"></i>Create Resource
                  </Title>
                }>
                <ResourceForm url={match.url} addResource={addResource} />
              </Card>
            </Col>
          </Route>
          {resource ? (
            <Route path={`${match.path}/:formAlias/edit`}>
              <Col lg={12} sm={24}>
                <Card
                  size={"small"}
                  title={
                    <Title level={3} style={{ marginBottom: 0 }}>
                      <i className="fas fa-layer-plus"></i>Update Resource
                    </Title>
                  }>
                  <ResourceForm
                    url={match.url}
                    updateResource={updateResource}
                    resource={resource}
                    initialValues={resource}
                  />
                </Card>
              </Col>
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
    </>
  );
};

export default React.memo(ResourcesContainer);
