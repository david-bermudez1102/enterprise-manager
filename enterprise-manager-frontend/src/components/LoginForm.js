import React, { Component } from "react";

export default class LoginForm extends Component {
  constructor() {
    super();
    this.state = { username: "", password: "" };
  }

  handleOnChange = event => {
    event.persist();
    this.setState({ [event.target.name]: event.target.value });
  };

  handleOnSubmit = event => {
    const { handleOnSubmit } = this.props;
    event.preventDefault();
    handleOnSubmit(this.state);
  };

  render() {
    return (
      <form onSubmit={this.handleOnSubmit}>
        <div className="form-group">
          <input
            type="text"
            name="username"
            id="login_username"
            className="form-control rounded-pill"
            onChange={this.handleOnChange}
            value={this.state.username}
            placeholder="Email or username..."
            required
          />
          <label className="form-control-placeholder" htmlFor="login_username">
            Username
          </label>
        </div>
        <div className="form-group">
          <input
            type="password"
            name="password"
            id="login_password"
            className="form-control rounded-pill"
            onChange={this.handleOnChange}
            value={this.state.password}
            placeholder="Your password..."
            required
          />
          <label className="form-control-placeholder" htmlFor="login_password">
            Password
          </label>
        </div>
        <hr />
        <input type="submit" className="btn btn-primary shadow" value="Login" />
      </form>
    );
  }
}
