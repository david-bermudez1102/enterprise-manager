import React, { Component } from "react";
import ResourceForm from "../../components/ResourceCreator/ResourceForm";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import { addResource } from "../../actions/resourceActions";

class ResourceContainer extends Component {
  render() {
    const { match, addResource } = this.props;
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
      </>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return { addResource: resource => dispatch(addResource(resource)) };
};

export default connect(null, mapDispatchToProps)(ResourceContainer);
