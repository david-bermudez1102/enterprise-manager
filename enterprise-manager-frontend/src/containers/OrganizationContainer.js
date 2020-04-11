import React, { Component } from "react";
import OrganizationForm from "../components/Organizations/OrganizationForm";
import { connect } from "react-redux";
import { addOrganization } from "../actions/organizationAction";
import { Route, Switch } from "react-router-dom";
import ResourcesContainer from "./ResourceCreator/ResourcesContainer";
import Organization from "../components/Organizations/Organization";
import { fetchResources } from "../actions/resourceActions";
import Settings from "./Settings/Settings";
import AllRecordsContainer from "./Records/AllRecordsContainer";
import { FormCard } from "../components/Cards/Cards";

class OrganizationContainer extends Component {
  state = { loaded: false };

  componentDidMount() {
    const { organizations, fetchResources } = this.props;
    return organizations.length > 0
      ? fetchResources(organizations[0].id).then(() => this.setState({ loaded: true }))
      : null;
  }

  componentDidUpdate(prevProps) {
    if (prevProps.admins !== this.props.admins || prevProps.organizations !== this.props.organizations) {
      const { organizations, admins, history, fetchResources } = this.props;
      if (organizations.length > 0) fetchResources(organizations[0].id).then(() => this.setState({ loaded: true }));
      return organizations.length > 0 && admins.length === 0 ? history.push("/accounts/new") : null;
    }
  }

  render() {
    const { match, addOrganization, resources, organizations } = this.props;
    const { loaded } = this.state;
    return (
      <Switch>
        <Route
          path={`${match.path}/new`}
          render={props => (
            <div className="row d-flex h-100 align-items-center justify-content-center">
              <div className="col-xl-5 col-lg-6 col-md-6 px-0">
                <FormCard
                  header={
                    <span className="card-title mb-0 text-white w-100">
                      <h2>
                        <i className="fas fa-plus-square mr-2"></i>Create new organization
                      </h2>
                    </span>
                  }>
                  <OrganizationForm {...props} addOrganization={addOrganization} />
                </FormCard>
              </div>
            </div>
          )}
        />
        <Route
          path={`${match.path}/:organizationId/settings`}
          render={props => <Settings {...props} resources={resources} organization={organizations[0]} />}
        />
        <Route
          path={`${match.path}/:organizationId/resources`}
          render={props => <ResourcesContainer {...props} resources={resources} loaded={loaded} />}
        />
        <Route
          path={`${match.path}/:organizationId/records`}
          render={props => <AllRecordsContainer {...props} resources={resources} />}
        />
        <Route path={`${match.path}/:organizationId`} render={props => <Organization {...props} />} />
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

export default connect(mapStateToProps, { addOrganization, fetchResources })(OrganizationContainer);
