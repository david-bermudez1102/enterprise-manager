import React, { Component } from "react";

export default class AdminForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      admin: {
        name: "",
        email: "",
        password: "",
        organization_id: props.organizationId
      }
    };
  }

  handleOnChange = event => {
    event.persist();
    this.setState({
      ...this.state,
      admin: { ...this.state.admin, [event.target.name]: event.target.value }
    });
  };

  handleOnSubmit = event => {
    event.preventDefault();
    this.props.addAdmin(this.state);
  };

  render() {
    return (
      <form onSubmit={this.handleOnSubmit}>
        <div className="form-group">
          <input
            type="text"
            name="name"
            id="admin_name"
            className="form-control"
            onChange={this.handleOnChange}
            value={this.state.name}
            placeholder="Enter your name..."
            required
          />
          <label className="form-control-placeholder" htmlFor="admin_name">
            Name
          </label>
        </div>
        <div className="form-group">
          <input
            type="text"
            name="email"
            id="admin_email"
            className="form-control"
            onChange={this.handleOnChange}
            value={this.state.email}
            placeholder="Enter your email..."
            required
          />
          <label className="form-control-placeholder" htmlFor="admin_email">
            Email
          </label>
        </div>
        <div className="form-group">
          <input
            type="password"
            name="password"
            id="admin_password"
            className="form-control"
            onChange={this.handleOnChange}
            value={this.state.password}
            placeholder="Enter your password..."
            required
          />
          <label className="form-control-placeholder" htmlFor="admin_password">
            Password
          </label>
        </div>
        <input type="submit" className="btn btn-primary shadow" value="Create Admin" />
      </form>
    );
  }
}
