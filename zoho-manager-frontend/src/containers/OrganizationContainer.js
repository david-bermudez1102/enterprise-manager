import React, { Component } from "react";
import OrganizationInput from "../components/OrganizationInput";
import { connect } from "react-redux";
import { addOrganization } from "../actions/organizationAction";
import { Route, Switch } from "react-router-dom";
import ResourcesContainer from "./ResourceCreator/ResourcesContainer";
import Organization from "../components/Organizations/Organization";
import { fetchResources } from "../actions/resourceActions";

class OrganizationContainer extends Component {
  state = { resources: [] };

  componentDidMount() {
    const { organizations, fetchResources } = this.props;
    fetchResources(organizations[0].id);
  }

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
              <ResourcesContainer {...props} resources={this.props.resources} />
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
    resources: state.resources
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
