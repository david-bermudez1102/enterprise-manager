import React, { Component } from "react";
import { Redirect } from "react-router-dom";

export default class ResourceDelete extends Component {
  constructor() {
    super();
    this.state = { status: "deleting" };
  }

  componentDidMount() {
    const { match, organizationId, removeResource } = this.props;
    console.log(match);
    removeResource(organizationId, match.params.resourceId).then(action =>
      this.setState({ status: action ? action.status : "deleted" })
    );
  }

  render() {
    const { redirectTo } = this.props;
    return this.state.status === "deleted" ? (
      <Redirect to={redirectTo} />
    ) : null;
  }
}
