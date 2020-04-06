import React, { Component } from "react";

class ResetForm extends Component {
  state = { email: "" };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
  };

  render() {
    const { email } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label htmlFor="account_email">Your Email:</label>
          <input
            type="email"
            name="email"
            id="account_email"
            className="form-control"
            onChange={this.handleChange}
            value={email}
            placeholder="Enter your email registered..."
          />
        </div>
        <input
          type="submit"
          className="btn btn-primary shadow"
          value="Reset Password"
        />
      </form>
    );
  }
}

export default ResetForm;
