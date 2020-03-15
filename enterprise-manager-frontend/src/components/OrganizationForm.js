import React, { Component } from "react";

export default class OrganizationForm extends Component {
  constructor() {
    super();
    this.state = { organization: { logo: "", name: "" } };
  }

  handleOnChange = event => {
    event.persist();
    this.setState({
      organization: {
        ...this.state.organization,
        [event.target.name]: event.target.value
      }
    });
  };

  handleOnChangeImage = event => {
    this.setState({
      organization: {
        ...this.state.organization,
        [event.target.name]: event.target.files[0]
      }
    });
  };

  handleOnSubmit = event => {
    event.preventDefault();
    this.props.addOrganization(this.state);
  };

  render() {
    return (
      <form onSubmit={this.handleOnSubmit}>
        <div className="form-group">
          <label htmlFor="logo">Import your organization logo</label>
          <input
            type="file"
            accept="image/*"
            name="logo"
            id="logo"
            onChange={this.handleOnChangeImage}
          />
        </div>
        <div className="form-group">
          <label htmlFor="organization_name">Name of your organization</label>
          <input
            type="text"
            name="name"
            id="organization_name"
            className="form-control"
            onChange={this.handleOnChange}
            value={this.state.organization.name}
            placeholder="Enter the name of your organization"
          />
        </div>
        <hr />
        <input type="submit" className="btn btn-primary" value="Create" />
      </form>
    );
  }
}
