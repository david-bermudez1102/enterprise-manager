import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

export default class CreateAccountInput extends Component {
  constructor() {
    super();
    this.state = { logo:"", name: "", email: "", privileges: "" };
  }

  handleOnChange = event => {
    event.persist();
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
        {this.state.name}
      </form>
    );
  }
}
