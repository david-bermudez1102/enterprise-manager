import React, { Component } from "react";
import ConnectionsForm from "../../components/Connections/ConnectionsForm";
import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import { updateResource } from "../../actions/resourceActions";
import ConnectionsList from "../../components/Connections/ConnectionsList";

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
    const { zohoIntegration, quickbooksIntegration } = organization;
    return (
      <Switch>
        <Route
          path={`${match.url}/zoho/edit`}
          render={() => (
            <ConnectionsForm
              resourceId={resource.id}
              resource={resource}
              connection={resource.zohoConnection}
              type="zoho_connection_attributes"
              integrationId={zohoIntegration ? zohoIntegration.id : null}
              organizationId={organization.id}
              updateResource={updateResource}
            />
          )}
        />
        <Route
          path={`${match.url}/quickbooks/edit`}
          render={() => (
            <ConnectionsForm
              resourceId={resource.id}
              resource={resource}
              connection={resource.quickbooksConnection}
              type="quickbooks_connection_attributes"
              integrationId={
                quickbooksIntegration ? quickbooksIntegration.id : null
              }
              organizationId={organization.id}
              updateResource={updateResource}
            />
          )}
        />
        <Route
          path={`${match.url}`}
          render={props => <ConnectionsList {...props} resource={resource} />}
        />
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
