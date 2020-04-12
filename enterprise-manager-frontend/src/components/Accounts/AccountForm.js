import React, { Component } from "react";
import cuid from "cuid";

class AccountForm extends Component {
  constructor(props) {
    super(props);
    const account = props.account;
    this.state = {
      id: account ? account.id : "",
      roles: ["Select", "Admin", "Manager", "Employee"],
      name: account ? account.name : "",
      email: account ? account.email : "",
      role: account ? account.type : "Select"
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
    const { addAdmin, addEmployee, addManager, updateAccount, adminId } = this.props;
    const { role, id, name, email } = this.state;
    event.preventDefault();
    if (updateAccount) updateAccount({ id, name, email });
    else {
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
      this.setState({ name: "", email: "", role: "Select" });
    }
  };

  render() {
    const { roles, name, email, role } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            name="name"
            id="account_name"
            className="form-control"
            onChange={this.handleChange}
            value={name}
            placeholder="Enter name..."
            required
          />
          <label className="form-control-placeholder" htmlFor="account_name">
            Employee Name
          </label>
        </div>
        <div className="form-group">
          <input
            type="text"
            name="email"
            id="account_email"
            className="form-control"
            onChange={this.handleChange}
            value={email}
            placeholder="Enter email..."
            required
          />
          <label className="form-control-placeholder" htmlFor="account_email">
            Employee Email
          </label>
        </div>
        <div className="form-group">
          <select
            name="role"
            id="account_role"
            onChange={this.handleChange}
            value={role}
            className="form-control"
            required>
            {roles.map(role => (
              <option value={role} key={cuid()}>
                {role}
              </option>
            ))}
          </select>
          <label className="form-control-placeholder" htmlFor="account_role">
            Employee Role
          </label>
        </div>
        <input type="submit" className="btn btn-primary shadow" />
      </form>
    );
  }
}
export default AccountForm;
