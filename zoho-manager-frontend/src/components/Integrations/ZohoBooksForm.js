import React, { Component } from "react";
import Alert from "../Alerts/Alert";

export default class ZohoBooksForm extends Component {
  constructor() {
    super();
    this.state = { auth_token: "", status: "", message: "" };
  }

  componentDidMount() {
    const { organization } = this.props;
    return organization
      ? this.setState({
          auth_token: organization.zohoIntegration
            ? organization.zohoIntegration.auth_token
            : ""
        })
      : null;
  }

  componentDidUpdate(prevProps) {
    if (prevProps.organization !== this.props.organization) {
      const { organization } = this.props;
      this.hideAlert();
      return organization
        ? this.setState({
            auth_token: organization.zohoIntegration
              ? organization.zohoIntegration.auth_token
              : ""
          })
        : null;
    }
  }

  hideAlert = () =>
    setTimeout(() => this.setState({ status: "", message: "" }), 3000);

  handleChange = event => {
    event.persist();
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { updateOrganization, organization, session } = this.props;
    const { auth_token } = this.state;
    this.setState({ status: "", message: "" }, () =>
      updateOrganization(
        {
          zoho_integration_attributes: {
            auth_token,
            account_id: session.currentUser.id,
            organization_id: organization.id
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
          <input
            type="text"
            name="auth_token"
            className="form-control"
            onChange={this.handleChange}
            value={this.state.auth_token}
            placeholder="Enter Zoho Auth Token"
          />
        </div>
        <input type="submit" className="btn btn-primary shadow" />
        {this.state.auth_token}
      </form>
    );
  }
}
