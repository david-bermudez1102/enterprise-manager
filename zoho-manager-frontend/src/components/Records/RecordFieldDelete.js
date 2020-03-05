import React, { Component } from "react";

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
    return <div>Done</div>;
  }
}
