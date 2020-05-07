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
import { FormCard } from "../../components/Cards/Cards";
import ResourceDelete from "../../components/Resources/ResourceDelete";
import ConnectionsContainer from "../Connections/ConnectionsContainer";
import Alert from "../../components/Alerts/Alert";
import Route from "../../Router/Route";

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
      <Alert />
      <div className="row" style={{ zIndex: 1 }}>
        <div
          className={`${
            isFieldsPath ? "col-lg-4" : "col-lg-5"
          } col-md-12 pr-3 pr-lg-0 min-h-100`}
          style={{ maxHeight: "80vh" }}>
          <div className="bg-light rounded p-2 h-100 shadow-sm">
            <ResourcesList loaded={loaded} loading={loading} />
          </div>
        </div>
        <Switch>
          <Route
            path={`${match.path}/new`}
            render={props => (
              <div className={`${isFieldsPath ? "col-lg-4" : "col-lg-7"}`}>
                <FormCard
                  header={
                    <h2>
                      <i className="fas fa-layer-plus mr-2"></i>New Resource
                    </h2>
                  }>
                  <ResourceForm url={match.url} addResource={addResource} />
                </FormCard>
              </div>
            )}
          />
          {resource ? (
            <Route path={`${match.path}/:formAlias/edit`}>
              <div
                className={`${
                  isFieldsPath ? "col-lg-4" : "col-lg-7"
                } min-h-100`}>
                <FormCard
                  header={
                    <h2>
                      <i className="far fa-edit mr-2"></i>Edit Resource
                    </h2>
                  }>
                  <ResourceForm
                    url={match.url}
                    updateResource={updateResource}
                    resource={resource}
                  />
                </FormCard>
              </div>
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
            <Route path={`${match.path}/:formAlias`} component={Resource} />
          ) : null}
        </Switch>
      </div>
    </>
  );
};

export default React.memo(ResourcesContainer);
