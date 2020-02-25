import React, { Component } from "react";
import OrganizationInput from "../components/OrganizationInput";
import { connect } from "react-redux";
import { addOrganization } from "../actions/organizationAction";
import { Route } from "react-router-dom";
import ResourceContainer from "./ResourceCreator/ResourceContainer";

class OrganizationContainer extends Component {
  componentDidMount() {
    const { organizations, isLoggedIn, history } = this.props;
    return organizations.length > 0 && !isLoggedIn
      ? history.push("/accounts/new")
      : "";
  }

  render() {
    const { match } = this.props;

    return (
      <div>
        <Route
          path={`${match.url}/new`}
          render={props => (
            <OrganizationInput
              {...props}
              addOrganization={this.props.addOrganization}
            />
          )}
        />
        <Route
          path={`${match.url}/:organizationId/resources`}
          render={props => <ResourceContainer {...props} />}
        />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addOrganization: organization => dispatch(addOrganization(organization))
  };
};

export default connect(null, mapDispatchToProps)(OrganizationContainer);
