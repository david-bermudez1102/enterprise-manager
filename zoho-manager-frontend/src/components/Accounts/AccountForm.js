import React, { Component } from "react";

class AccountForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roles: ["Select", "Admin", "Manager", "Employee"],
      name: "",
      email: "",
      role: "Select"
    };
  }

  handleOnChange = event => {
    event.persist();
    this.setState({ [event.target.name]: event.target.value });
  };

  handleOnSubmit = event => {
    event.preventDefault();
    this.props.handleOnSubmit(this.state);
  };

  render() {
    const { roles, name, email, role } = this.state;
    return (
      <form onSubmit={this.handleOnSubmit}>
        <div className="form-group">
          <input
            type="text"
            name="name"
            className="form-control"
            onChange={this.handleOnChange}
            value={name}
            placeholder="Employee name..."
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            name="email"
            className="form-control"
            onChange={this.handleOnChange}
            value={email}
            placeholder="Employee email..."
          />
        </div>
        <div className="form-group">
          <select
            name="role"
            onChange={this.handleOnChange}
            value={role}
            className="form-control">
            {roles.map(role => (
              <option value={role}>{role}</option>
            ))}
          </select>
        </div>
        <input type="submit" className="btn btn-primary shadow" />
        {email}
      </form>
    );
  }
}
export default AccountForm;
