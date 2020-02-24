import React, { Component } from "react";

export default class LoginForm extends Component {
  constructor() {
    super();
    this.state = { email: "", password: "" };
  }

  handleOnChange = event => {
    event.persist()
    this.setState({ [event.target.name]: event.target.value });
  };

  handleOnSubmit = event => {
    event.preventDefault();
    this.props.handleOnSubmit(this.state)
  };

  render() {
    return (
      <form onSubmit={this.handleOnSubmit}>
        <input
          type="text"
          name="username"
          onChange={this.handleOnChange}
          value={this.state.username}
          placeholder="Email or username..."
        />
        <input
          type="password"
          name="password"
          onChange={this.handleOnChange}
          value={this.state.password}
          placeholder="Your password..."
        />
        <input type="submit" />
        {this.state.name}
      </form>
    );
  }
}
