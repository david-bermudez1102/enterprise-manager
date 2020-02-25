import React, { Component } from "react";
import OrganizationInput from "../components/OrganizationInput";
import { connect } from "react-redux";
import { addOrganization } from "../actions/organizationAction";
import { Route } from "react-router-dom";
import ResourceContainer from "./ResourceCreator/ResourceContainer";
import Organization from "../components/Organizations/Organization";

class OrganizationContainer extends Component {

  componentDidUpdate(prevProps) {
    const { organizations, isLoggedIn, history } = this.props;
    if (prevProps.isLoggedIn !== isLoggedIn) {
      return organizations.length > 0 && !isLoggedIn
        ? history.push("/accounts/new")
        : "";
    }
  }

  render() {
    const { match, addOrganization } = this.props;
    return (
      <div>
        <Route
          path={`${match.url}/new`}
          render={props => (
            <OrganizationInput {...props} addOrganization={addOrganization} />
          )}
        />
        <Route
          path={`${match.url}/:organizationId/resources`}
          render={props => <ResourceContainer {...props} />}
        />
        <Route
          exact path={`${match.url}/:organizationId/`}
          render={props => <Organization {...props} />}
        />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addOrganization: organization => dispatch(addOrganization(organization)),
    fetchResources: organizationId => dispatch(fetchResources(organizationId))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(OrganizationContainer);
