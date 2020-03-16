import React, { Component } from "react";
import ResourceForm from "../../components/ResourceCreator/ResourceForm";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import {
  addResource,
  updateResource,
  removeResource
} from "../../actions/resourceActions";
import ResourcesList from "../../components/Resources/ResourcesList";
import { fetchFields } from "../../actions/fieldActions";
import { fetchRecordFields } from "../../actions/recordFieldActions";
import Resource from "../../components/Resources/Resource";
import cuid from "cuid";
import { FormCard } from "../../components/Cards/Cards";
import ResourceDelete from "../../components/Resources/ResourceDelete";
import ConnectionsContainer from "../Connections/ConnectionsContainer";

class ResourcesContainer extends Component {
  componentDidMount() {
    const { resources, fetchFields, fetchRecordFields } = this.props;
    resources.map(resource => {
      fetchFields(resource.organizationId, resource.id);
      return fetchRecordFields(resource.organizationId, resource.id);
    });
  }

  componentDidUpdate(prevProps) {
    const { resources, fetchFields, fetchRecordFields } = this.props;
    if (prevProps.resources !== this.props.resources)
      resources.map(resource => {
        fetchFields(resource.organizationId, resource.id);
        return fetchRecordFields(resource.organizationId, resource.id);
      });
  }

  render() {
    const {
      match,
      addResource,
      updateResource,
      removeResource,
      resources,
      location,
      history
    } = this.props;
    const { organizationId } = match.params;
    const isFieldsPath = location.pathname.includes("fields");
    return (
      <div className="row">
        <div
          className={`${
            isFieldsPath ? "col-lg-4" : "col-lg-5"
          } col-md-12 min-h-100 pr-0`}>
          <div className="bg-white rounded p-2 h-100 shadow-sm">
            <div className="list-group">
              <ResourcesList
                match={match}
                location={location}
                history={history}
                resources={resources}
                organizationId={organizationId}
              />
            </div>
          </div>
        </div>
        <Switch>
          <Route
            path={`${match.path}/new`}
            render={props => (
              <div
                className={`${
                  isFieldsPath ? "col-lg-4" : "col-lg-7"
                } min-h-100`}>
                <FormCard
                  header={
                    <span
                      className="card-title display-4"
                      style={{ fontSize: "32px" }}>
                      New Resource
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
                        className="card-title display-4"
                        style={{ fontSize: "32px" }}>
                        Edit Resource
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
          <Route
            path={`${match.path}/:formAlias`}
            render={props => (
              <Resource {...props} key={cuid()} location={location} />
            )}
          />
          />
        </Switch>
      </div>
    );
  }
}

export default connect(null, {
  addResource,
  updateResource,
  removeResource,
  fetchFields,
  fetchRecordFields
})(ResourcesContainer);