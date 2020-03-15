import React, { Component } from "react";
import { Redirect } from "react-router-dom";

export default class FieldDelete extends Component {
  constructor() {
    super();
    this.state = { status: "deleting" };
  }

  componentDidMount() {
    const { match, organizationId, resourceId, removeField } = this.props;
    removeField(organizationId, resourceId, match.params.fieldId).then(action =>
      this.setState({ status: action ? action.status : "deleted" })
    );
  }

  render() {
    const { redirectTo } = this.props;
    return this.state.status === "deleted" ? <Redirect to={redirectTo} /> : null;
  }
}
