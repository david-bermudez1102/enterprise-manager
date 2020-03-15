import React, { Component } from "react";
import { Redirect } from "react-router-dom";

export default class RecordFieldDelete extends Component {
  constructor() {
    super();
    this.state = { status: "deleting" };
  }

  componentDidMount() {
    const { match, organizationId, resourceId, removeRecordField } = this.props;
    removeRecordField(
      organizationId,
      resourceId,
      match.params.recordFieldId
    ).then(action =>
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
