import React, { Component } from "react";
import ResourceForm from "../../components/ResourceCreator/ResourceForm";
import { Route } from "react-router-dom";

class ResourceContainer extends Component {
  render() {
    const { match } = this.props;
    return (
      <Route
        path={`${match.url}/new`}
        render={props => <ResourceForm {...props} />}
      />
    );
  }
}

export default ResourceContainer;
