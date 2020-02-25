import React, { Component } from "react";
import ResourceForm from "../../components/ResourceCreator/ResourceForm";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import { addResource } from "../../actions/resourceActions";
import ResourcesList from "../../components/Resources/ResourcesList";
import Resource from "../../components/Resources/Resource";

class ResourcesContainer extends Component {
  render() {
    const { match, addResource, resources } = this.props;
    const { organizationId } = match.params;
    return (
      <>
        <Route
          path={`${match.url}/new`}
          render={props => (
            <ResourceForm
              {...props}
              addResource={addResource}
              organizationId={organizationId}
            />
          )}
        />
        <Route
          exact
          path={`${match.url}`}
          render={props => <ResourcesList {...props} resources={resources}/>}
        />
        <Route
          path={`${match.url}/:resourceId`}
          render={props => <Resource {...props} resources={resources}/>}
        />
      </>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return { addResource: resource => dispatch(addResource(resource)) };
};

export default connect(null, mapDispatchToProps)(ResourcesContainer);
