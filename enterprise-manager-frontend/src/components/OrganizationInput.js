import React, { Component } from "react";

export default class OrganizationInput extends Component {
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
      organization: {...this.state.organization,
        [event.target.name]: event.target.files[0]
      }
    });
  }

  handleOnSubmit = event => {
    event.preventDefault();
    this.props.addOrganization(this.state);
  };

  render() {
    return (
      <form onSubmit={this.handleOnSubmit}>
        <input
          type="file"
          accept="image/*"
          name="logo"
          onChange={this.handleOnChangeImage}
        />
        <input
          type="text"
          name="name"
          onChange={this.handleOnChange}
          value={this.state.organization.name}
          placeholder="Enter the name of your organization"
        />
        <input type="submit" />
        {this.state.organization.name}
      </form>
    );
  }
}
