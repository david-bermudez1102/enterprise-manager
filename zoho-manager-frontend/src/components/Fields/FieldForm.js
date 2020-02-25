import React, { Component } from "react";

export default class FieldForm extends Component {
  constructor() {
    super();
    this.state = { admin: { name: "", email: "", password: "" } };
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
        <input
          type="text"
          name="name"
          onChange={this.handleOnChange}
          value={this.state.name}
          placeholder="Enter Name"
        />
        <input
          type="email"
          name="email"
          onChange={this.handleOnChange}
          value={this.state.email}
          placeholder="Enter Email"
        />
        <input
          type="password"
          name="password"
          onChange={this.handleOnChange}
          value={this.state.password}
          placeholder="Enter Password"
        />
        <input type="submit" />
      </form>
    );
  }
}
