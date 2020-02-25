import React, { Component } from "react";
import { connect } from "react-redux";
import LoginForm from "../components/LoginForm";

class LoginContainer extends Component {
  componentDidUpdate() {
    return this.props.isLoggedIn ? this.redirect() : null;
  }

  handleOnSubmit = data => {
    const configObj = {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(data)
    };
    fetch("/sessions", configObj)
      .then(response => response.json())
      .then(data =>
        !data.error ? this.props.setAccount(data.attributes) : ""
      ).then(() => this.redirect())
  };

  redirect = () => {
    this.props.history.push("/home");
  };

  render() {
    return (
      <div>
        <LoginForm handleOnSubmit={this.handleOnSubmit} />
      </div>
    );
  }
}

export default connect()(LoginContainer);
