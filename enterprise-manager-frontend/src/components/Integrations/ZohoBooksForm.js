import React, { Component } from 'react';

export default class ZohoBooksForm extends Component {
  constructor() {
    super();
    this.state = {
      auth_token: '',
      client_id: '',
      client_secret: '',
      redirect_uri: '',
      external_organization_id: ''
    };
  }

  componentDidMount() {
    const { organization } = this.props;
    return organization
      ? this.setState({
          auth_token: organization.zohoIntegration
            ? organization.zohoIntegration.auth_token
            : '',
          client_id: organization.zohoIntegration
            ? organization.zohoIntegration.client_id
            : '',
          client_secret: organization.zohoIntegration
            ? organization.zohoIntegration.client_secret
            : '',
          redirect_uri: organization.zohoIntegration
            ? organization.zohoIntegration.redirect_uri
            : '',
          external_organization_id: organization.zohoIntegration
            ? organization.zohoIntegration.external_organization_id
            : ''
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
              : '',
            client_id: organization.zohoIntegration
              ? organization.zohoIntegration.client_id
              : '',
            client_secret: organization.zohoIntegration
              ? organization.zohoIntegration.client_secret
              : '',
            redirect_uri: organization.zohoIntegration
              ? organization.zohoIntegration.redirect_uri
              : '',
            external_organization_id: organization.zohoIntegration
              ? organization.zohoIntegration.external_organization_id
              : ''
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
    const {
      auth_token,
      client_id,
      client_secret,
      redirect_uri,
      external_organization_id
    } = this.state;
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
    );
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label htmlFor="client_id">Client Id</label>
          <input
            type="password"
            name="client_id"
            id="client_id"
            className="form-control"
            onChange={this.handleChange}
            value={this.state.client_id}
            placeholder="Enter Zoho Client Id"
          />
          <small id="encrypted_block" className="form-text text-muted">
            This field is encrypted.
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="client_secret">Client Secret</label>
          <input
            type="password"
            name="client_secret"
            id="client_secret"
            className="form-control"
            onChange={this.handleChange}
            value={this.state.client_secret}
            placeholder="Enter Zoho Client Secret"
          />
          <small id="encrypted_block" className="form-text text-muted">
            This field is encrypted.
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="auth_token">Zoho Auth Token</label>
          <input
            type="password"
            name="auth_token"
            id="auth_token"
            className="form-control"
            onChange={this.handleChange}
            value={this.state.auth_token}
            placeholder="Enter Zoho Auth Token"
          />
          <small id="encrypted_block" className="form-text text-muted">
            This field is encrypted.
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="redirect_uri">Redirect URI</label>
          <input
            type="text"
            name="redirect_uri"
            id="redirect_uri"
            className="form-control"
            onChange={this.handleChange}
            value={this.state.redirect_uri}
            placeholder="Enter Zoho Redirect URI"
          />
        </div>
        <div className="form-group">
          <label htmlFor="external_organization_id">Organization Id</label>
          <input
            type="text"
            name="external_organization_id"
            id="external_organization_id"
            className="form-control"
            onChange={this.handleChange}
            value={this.state.external_organization_id}
            placeholder="Enter Zoho Organization Id"
          />
        </div>
        <hr />
        <input
          type="submit"
          className="btn btn-primary shadow"
          value="Update"
        />
      </form>
    );
  }
}
