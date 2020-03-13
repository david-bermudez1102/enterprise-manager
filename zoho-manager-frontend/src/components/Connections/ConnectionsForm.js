import React, { Component } from "react";
import Alert from "../Alerts/Alert";

export default class ConnectionsForm extends Component {
  constructor() {
    super();
    this.state = { name: "", type: "" };
  }

  componentDidMount() {
    const { organization } = this.props;
    return organization ? null : null;
  }

  componentDidUpdate(prevProps) {
    if (prevProps.organization !== this.props.organization) {
      const { organization } = this.props;
      this.hideAlert();
      return organization ? this.setState({}) : null;
    }
  }

  hideAlert = () =>
    setTimeout(() => this.setState({ status: "", message: "" }), 3000);

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { updateOrganization, organization, session } = this.props;
    const {
      auth_token,
      client_id,
      client_secret,
      redirect_uri,
      external_organization_id
    } = this.state;
    this.setState({ status: "", message: "" }, () =>
      updateOrganization(
        {
          zoho_integration_attributes: {
            auth_token,
            client_id,
            client_secret,
            account_id: session.currentUser.id,
            organization_id: organization.id,
            redirect_uri,
            external_organization_id
          }
        },
        organization.id
      ).then(org =>
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
          <label htmlFor="connection_type">Connect this resource to:</label>
          <select
            name="type"
            id="connection_type"
            className="form-control"
            onChange={this.handleChange}
            value={this.state.type}>
            <option value="select">Select</option>
            <option value="contacts">Contacts</option>
            <option value="items">Items</option>
            <option value="invoices">Invoices</option>
          </select>
        </div>
        <input
          type="submit"
          className="btn btn-primary shadow"
          value="Create Connection"
        />
      </form>
    );
  }
}
