import React, { Component } from "react";

export default class ZohoBooksForm extends Component {
  constructor() {
    super();
    this.state = { auth_token: "" };
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
      return organization
        ? this.setState({
            auth_token: organization.zohoIntegration
              ? organization.zohoIntegration.auth_token
              : ""
          })
        : null;
    }
  }

  handleChange = event => {
    event.persist();
    this.setState({
      ...this.state,
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { updateOrganization, organization, session } = this.props;
    const { auth_token } = this.state;
    updateOrganization(
      {
        zoho_integration_attributes: {
          auth_token,
          account_id: session.currentUser.id
        }
      },
      organization.id
    ).then(org =>
      org
        ? this.setState({ status: "success" })
        : this.setState({ status: "error" })
    );
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
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
