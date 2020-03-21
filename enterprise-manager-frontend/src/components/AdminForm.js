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
          <label htmlFor="admin_name">Your Name:</label>
          <input
            type="text"
            name="name"
            id="admin_name"
            className="form-control"
            onChange={this.handleOnChange}
            value={this.state.name}
            placeholder="Enter Name..."
          />
        </div>
        <div className="form-group">
          <label htmlFor="admin_email">Your Email:</label>
          <input
            type="email"
            name="email"
            id="admin_email"
            className="form-control"
            onChange={this.handleOnChange}
            value={this.state.email}
            placeholder="Enter Email..."
          />
        </div>
        <div className="form-group">
          <label htmlFor="admin_password">Your Password:</label>
          <input
            type="password"
            name="password"
            id="admin_password"
            className="form-control"
            onChange={this.handleOnChange}
            value={this.state.password}
            placeholder="Enter Password..."
          />
        </div>
        <input
          type="submit"
          className="btn btn-primary shadow"
          value="Create Admin"
        />
      </form>
    );
  }
}
