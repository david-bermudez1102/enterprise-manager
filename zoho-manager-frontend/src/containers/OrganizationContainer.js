import React, { Component } from "react";
import OrganizationInput from "../components/OrganizationInput";
import { connect } from "react-redux";
import { addOrganization } from "../actions/organizationAction";
import { Route, Switch } from "react-router-dom";
import ResourcesContainer from "./ResourceCreator/ResourcesContainer";
import Organization from "../components/Organizations/Organization";
import { fetchResources } from "../actions/resourceActions";

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
      <div>
        <Switch>
          <Route
            path={`${match.path}/new`}
            render={props => (
              <OrganizationInput {...props} addOrganization={addOrganization} />
            )}
          />
          <Route
            path={`${match.path}/:organizationId/resources`}
            render={props => (
              <ResourcesContainer {...props} resources={resources} />
            )}
          />
          <Route
            exact
            path={`${match.path}/:organizationId/`}
            render={props => <Organization {...props} />}
          />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    resources: state.resources,
    organizations: state.organizations
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addOrganization: organization => dispatch(addOrganization(organization)),
    fetchResources: organizationId => dispatch(fetchResources(organizationId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrganizationContainer);
