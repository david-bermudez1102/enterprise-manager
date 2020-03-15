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
    event.preventDefault();
    this.props.handleOnSubmit(this.state);
  };

  render() {
    return (
      <form onSubmit={this.handleOnSubmit}>
        <div className="form-group">
          <input
            type="text"
            name="username"
            className="form-control rounded-pill"
            onChange={this.handleOnChange}
            value={this.state.username}
            placeholder="Email or username..."
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            name="password"
            className="form-control rounded-pill"
            onChange={this.handleOnChange}
            value={this.state.password}
            placeholder="Your password..."
          />
        </div>
        <hr />
        <input type="submit" className="btn btn-primary shadow" value="Login" />
      </form>
    );
  }
}
