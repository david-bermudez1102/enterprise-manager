import React, { Component } from "react";

export default class LoginInput extends Component {
  constructor() {
    super();
    this.state = { name: "", email: "", privileges: "" };
  }

  handleOnChange = event => {
    event.persist()
    this.setState({ [event.target.name]: event.target.value });
  };

  handleOnSubmit = event => {
    event.preventDefault();
  };

  render() {
    return (
      <form onSubmit={this.handleOnSubmit}>
        <input
          type="text"
          name="name"
          onChange={this.handleOnChange}
          value={this.state.name}
        />
        <input
          type="email"
          name="email"
          onChange={this.handleOnChange}
          value={this.state.email}
        />
        <input type="submit" />
        {this.state.name}
      </form>
    );
  }
}
