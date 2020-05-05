import React, { PureComponent } from "react";
import ResourceForm from "../../components/ResourceCreator/ResourceForm";
import { Switch } from "react-router-dom";
import { connect } from "react-redux";
import {
  addResource,
  updateResource,
  removeResource,
} from "../../actions/resourceActions";
import ResourcesList from "../../components/Resources/ResourcesList";
import Resource from "../../components/Resources/Resource";
import { FormCard } from "../../components/Cards/Cards";
import ResourceDelete from "../../components/Resources/ResourceDelete";
import ConnectionsContainer from "../Connections/ConnectionsContainer";
import Alert from "../../components/Alerts/Alert";
import Route from "../../Router/Route";

class ResourcesContainer extends PureComponent {
  render() {
    const {
      loaded,
      match,
      addResource,
      updateResource,
      removeResource,
      resources,
      location,
      history,
    } = this.props;

    const { organizationId } = match.params;
    const isFieldsPath = location.pathname.includes("fields");
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
              <ResourcesList
                match={match}
                location={location}
                history={history}
                resources={resources}
                organizationId={organizationId}
                loaded={loaded}
              />
            </div>
          </div>
          <Switch>
            <Route
              path={`${match.path}/new`}
              render={props => (
                <div className={`${isFieldsPath ? "col-lg-4" : "col-lg-7"}`}>
                  <FormCard
                    header={
                      <span
                        className="card-title display-4 mb-0 text-light"
                        style={{ fontSize: "32px" }}>
                        <i className="fas fa-layer-plus mr-2"></i>New Resource
                      </span>
                    }>
                    <ResourceForm
                      {...props}
                      addResource={addResource}
                      organizationId={organizationId}
                    />
                  </FormCard>
                </div>
              )}
            />
            {resources.length > 0 ? (
              <Route
                path={`${match.path}/:formAlias/edit`}
                render={props => (
                  <div
                    className={`${
                      isFieldsPath ? "col-lg-4" : "col-lg-7"
                    } min-h-100`}>
                    <FormCard
                      header={
                        <span
                          className="card-title display-4 mb-0 text-primary"
                          style={{ fontSize: "32px" }}>
                          <i className="far fa-edit mr-2"></i>Edit Resource
                        </span>
                      }>
                      <ResourceForm
                        {...props}
                        url={`${match.url}`}
                        updateResource={updateResource}
                        organizationId={organizationId}
                        resources={resources}
                      />
                    </FormCard>
                  </div>
                )}
              />
            ) : null}
            {resources.length > 0 ? (
              <Route
                path={`${match.path}/:formAlias/connections`}
                render={props => (
                  <ConnectionsContainer {...props} resources={resources} />
                )}
              />
            ) : null}
            <Route
              path={`${match.path}/:resourceId/delete`}
              render={props => (
                <ResourceDelete
                  {...props}
                  redirectTo={`${match.url}`}
                  organizationId={organizationId}
                  removeResource={removeResource}
                />
              )}
            />
            {resources.length > 0 ? (
              <Route path={`${match.path}/:formAlias`} component={Resource} />
            ) : null}
          </Switch>
        </div>
      </>
    );
  }
}

export default connect(null, {
  addResource,
  updateResource,
  removeResource,
})(ResourcesContainer);
