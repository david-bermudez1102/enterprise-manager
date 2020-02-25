import React, { Component } from "react";
import ResourceForm from "../../components/ResourceCreator/ResourceForm";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { addResource } from "../../actions/resourceActions";
import ResourcesList from "../../components/Resources/ResourcesList";
import Resource from "../../components/Resources/Resource";

class ResourcesContainer extends Component {
  render() {
    const { match, addResource, resources } = this.props;
    const { organizationId } = match.params;

    return (
      <Switch>
        <Route
          exact
          path={`${match.path}`}
          render={props => <ResourcesList {...props} resources={resources} />}
        />
        <Route
          exact
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
          path={`${match.path}/:resourceId`}
          render={props =>
            props.match.params.resourceId !== "new" ? (
              <Resource {...props} resources={resources} />
            ) : null
          }
        />
      </Switch>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return { addResource: resource => dispatch(addResource(resource)) };
};

export default connect(null, mapDispatchToProps)(ResourcesContainer);
