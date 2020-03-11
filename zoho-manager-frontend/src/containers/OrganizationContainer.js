import React, { Component } from "react";
import OrganizationInput from "../components/OrganizationInput";
import { connect } from "react-redux";
import { addOrganization } from "../actions/organizationAction";
import { Route, Switch } from "react-router-dom";
import ResourcesContainer from "./ResourceCreator/ResourcesContainer";
import Organization from "../components/Organizations/Organization";
import { fetchResources } from "../actions/resourceActions";
import Settings from "./Settings/Settings";

class OrganizationContainer extends Component {
  componentDidMount() {
    const { organizations, fetchResources } = this.props;
    return organizations.length > 0
      ? fetchResources(organizations[0].id)
      : null;
  }

  componentDidUpdate(prevProps) {
    const { organizations, session, history, fetchResources } = this.props;
    if (prevProps.session !== session) {
      if (organizations.length > 0) fetchResources(organizations[0].id);
      return organizations.length > 0 && !session.isLoggedIn
        ? history.push("/accounts/new")
        : "";
    }
  }

  render() {
    const { match, addOrganization, resources } = this.props;
    return (
      <Switch>
        <Route
          path={`${match.path}/new`}
          render={props => (
            <OrganizationInput {...props} addOrganization={addOrganization} />
          )}
        />
        <Route
          path={`${match.path}/:organizationId/settings`}
          render={props => <Settings {...props} resources={resources} />}
        />
        <Route
          path={`${match.path}/:organizationId/resources`}
          render={props => (
            <ResourcesContainer {...props} resources={resources} />
          )}
        />
        <Route
          path={`${match.path}/:organizationId`}
          render={props => <Organization {...props} />}
        />
      </Switch>
    );
  }
}

const mapStateToProps = ({ resources, organizations }) => {
  return {
    resources,
    organizations
  };
};

export default connect(mapStateToProps, { addOrganization, fetchResources })(
  OrganizationContainer
);
