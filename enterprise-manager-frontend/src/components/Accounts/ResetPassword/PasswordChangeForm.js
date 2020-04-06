import React, { Component } from "react";

class PasswordChangeForm extends Component {
  state = { password: "", passwordConfirmation: "" };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { handleSubmit, token, history } = this.props;
    handleSubmit(token, this.state).then(resp =>
      resp === "success" ? history.replace("/login") : null
    );
  };

  render() {
    const { password, passwordConfirmation } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label htmlFor="account_password">New Password:</label>
          <input
            type="password"
            name="password"
            id="account_password"
            className="form-control"
            onChange={this.handleChange}
            value={password}
            placeholder="Enter new password..."
          />
        </div>
        <div className="form-group">
          <label htmlFor="account_password_confirmation">
            Confirm Password:
          </label>
          <input
            type="password"
            name="passwordConfirmation"
            id="account_password_confirmation"
            className="form-control"
            onChange={this.handleChange}
            value={passwordConfirmation}
            placeholder="Confirm your new password..."
          />
        </div>
        <input
          type="submit"
          className="btn btn-primary shadow"
          value="Change Password"
        />
      </form>
    );
  }
}

export default PasswordChangeForm;
