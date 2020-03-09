import React, { Component } from "react";
import cuid from "cuid";

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

  handleChange = event => {
    event.persist();
    this.setState({
      account: {
        ...this.state.account,
        [event.target.name]: event.target.value
      },
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = event => {
    const { addAdmin, addEmployee, addManager, adminId } = this.props;
    const { role, name, email } = this.state;
    event.preventDefault();
    switch (role) {
      case "Admin":
        addAdmin({ admin: { name, email } });
        break;
      case "Manager":
        addManager(adminId, { manager: { name, email } });
        break;
      case "Employee":
        addEmployee(adminId, { employee: { name, email } });
        break;
      default:
        break;
    }
    this.setState({ account: { name: "", email: "" }, role: "Select" });
  };

  render() {
    const { roles, name, email, role } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            name="name"
            className="form-control"
            onChange={this.handleChange}
            value={name}
            placeholder="Employee name..."
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            name="email"
            className="form-control"
            onChange={this.handleChange}
            value={email}
            placeholder="Employee email..."
          />
        </div>
        <div className="form-group">
          <select
            name="role"
            onChange={this.handleChange}
            value={role}
            className="form-control">
            {roles.map(role => (
              <option value={role} key={cuid()}>
                {role}
              </option>
            ))}
          </select>
        </div>
        <input type="submit" className="btn btn-primary shadow" />
      </form>
    );
  }
}
export default AccountForm;
