import React, { Component } from "react";
import ResourceForm from "../../components/ResourceCreator/ResourceForm";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { addResource } from "../../actions/resourceActions";
import ResourcesList from "../../components/Resources/ResourcesList";
import { fetchFields } from "../../actions/fieldActions";
import { fetchRecordFields } from "../../actions/recordFieldActions";
import Resource from "../../components/Resources/Resource";
import cuid from "cuid";

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
    const { match, addResource, resources } = this.props;
    const { organizationId } = match.params;
    return (
      <div className="row">
        <div className="col-lg-5">
          <div className="list-group">
            <ResourcesList
              match={match}
              resources={resources}
              organizationId={organizationId}
            />
          </div>
        </div>
        <Switch>
          <Route
            path={`${match.path}/new`}
            render={props => (
              <div className="col-lg-7">
                <ResourceForm
                  {...props}
                  addResource={addResource}
                  organizationId={organizationId}
                />
              </div>
            )}
          />
          <Route
            path={`${match.path}/:formAlias`}
            render={props => <Resource {...props} key={cuid()} />}
          />
        </Switch>
      </div>
    );
  }
}

export default connect(null, { addResource, fetchFields, fetchRecordFields })(
  ResourcesContainer
);
