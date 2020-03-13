import React, { Component } from "react";
import ConnectionsForm from "../../components/Connections/ConnectionsForm";
import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";

class ConnectionsContainer extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { match, resources, organizations, organizationId } = this.props;
    const resource = resources.find(
      resource => resource.formAlias === match.params.formAlias
    );
    const organization = organizations.find(
      organization => organization.id === resource.organizationId
    );
    console.log(organization);
    return (
      <Switch>
        <Route path={`${match.url}/new`} render={() => <ConnectionsForm />} />
        <Route
          path={`${match.url}`}
          render={() => (
            <ConnectionsForm
              resourceId={resource.id}
              integrationId={organization.zohoIntegration.id}
            />
          )}
        />
      </Switch>
    );
  }
}

const mapStateToProps = ({ organizations }) => {
  return { organizations };
};
export default connect(mapStateToProps)(ConnectionsContainer);
