import React, { Component } from "react";
import ConnectionsForm from "../../components/Connections/ConnectionsForm";
import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import { updateResource } from "../../actions/resourceActions";

class ConnectionsContainer extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { match, resources, organizations, updateResource } = this.props;
    const resource = resources.find(
      resource => resource.formAlias === match.params.formAlias
    );
    const organization = organizations.find(
      organization => organization.id === resource.organizationId
    );
    return (
      <Switch>
        <Route
          path={`${match.url}/new`}
          render={() => (
            <ConnectionsForm
              resourceId={resource.id}
              resource={resource}
              integrationId={organization.zohoIntegration.id}
              organizationId={organization.id}
              updateResource={updateResource}
            />
          )}
        />
        <Route path={`${match.url}`} render={() => <ConnectionsForm />} />
      </Switch>
    );
  }
}

const mapStateToProps = ({ organizations }) => {
  return { organizations };
};
export default connect(mapStateToProps, { updateResource })(
  ConnectionsContainer
);
