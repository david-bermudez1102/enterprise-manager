import React, { Component } from "react";
import ResourceForm from "../../components/ResourceCreator/ResourceForm";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { addResource } from "../../actions/resourceActions";
import ResourcesList from "../../components/Resources/ResourcesList";
import { fetchFields } from "../../actions/fieldActions";
import { fetchRecordFields } from "../../actions/recordFieldActions";

class ResourcesContainer extends Component {

  componentDidMount() {
    const { resources, fetchFields, fetchRecordFields } = this.props;
    resources.map(resource => {
      fetchFields(resource.organizationId, resource.id);
      fetchRecordFields(resource.organizationId, resource.id);
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
      <Switch>
        <Route
          path={`${match.path}/new`}
          render={props => (
            <ResourceForm
              {...props}
              addResource={addResource}
              organizationId={organizationId}
            />
          )}
        />
        <Route
          path={`${match.path}`}
          render={props => (
            <ResourcesList
              {...props}
              resources={resources}
              organizationId={organizationId}
            />
          )}
        />
      </Switch>
    );
  }
}

export default connect(null, { addResource, fetchFields, fetchRecordFields })(ResourcesContainer);
