import React, { Component } from "react";
import Alert from "../Alerts/Alert";

const snakeCaseKeys = require("snakecase-keys");

export default class ConnectionsForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: props.type,
      resourceId: props.resourceId,
      integrationId: props.integrationId,
      organizationId: props.organizationId,
      name: "",
      connectionType: "",
      status: "",
      message: ""
    };
  }

  componentDidMount() {
    const { connection } = this.props;
    return connection ? this.updateState() : null;
  }

  componentDidUpdate(prevProps) {
    if (prevProps.resource !== this.props.resource) {
      const { connection } = this.props;
      this.hideAlert();
      return connection ? this.updateState() : null;
    }
  }

  updateState = () => {
    const { connection, organizationId } = this.props;
    this.setState({
      resourceId: connection.form_id,
      integrationId: connection.integration_id,
      organizationId: organizationId,
      name: connection.name,
      connectionType: connection.connection_type,
      status: "",
      message: ""
    });
  };

  hideAlert = () =>
    setTimeout(() => this.setState({ status: "", message: "" }), 3000);

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    const {
      integrationId,
      type,
      resourceId,
      organizationId,
      name,
      connectionType
    } = this.state;
    this.setState({ status: "", message: "" }, () =>
      this.props
        .updateResource(
          snakeCaseKeys({
            [type]: {
              integrationId,
              name,
              connectionType,
              formId: resourceId
            }
          }),
          organizationId,
          resourceId
        )
        .then(org =>
          org
            ? this.setState({
                status: "success",
                message: "Zoho Books Auth Token was updated successfully"
              })
            : this.setState({
                status: "error",
                message: "Could not be updated"
              })
        )
    );
  };

  render() {
    const { status, message } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <Alert type={status}>{message}</Alert>
        <div className="form-group">
          <label htmlFor="connection_name">
            Enter a name for this connection:
          </label>
          <input
            type="text"
            name="name"
            id="connection_name"
            className="form-control"
            onChange={this.handleChange}
            value={this.state.name}
            placeholder="Enter name..."
          />
          <label htmlFor="connection_connectionType">
            Connect this resource to:
          </label>
          <select
            name="connectionType"
            id="connection_connectionType"
            className="form-control"
            onChange={this.handleChange}
            value={this.state.connectionType}>
            <option value="select">Select</option>
            <option value="contacts">Contacts</option>
            <option value="items">Items</option>
            <option value="invoices">Invoices</option>
          </select>
        </div>
        <input
          type="submit"
          className="btn btn-primary shadow"
          value="Update Connection"
        />
      </form>
    );
  }
}
