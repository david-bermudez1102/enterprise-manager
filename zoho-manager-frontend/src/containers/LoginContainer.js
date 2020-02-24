import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import LoginForm from "../components/LoginForm";

class LoginContainer extends Component {

  componentDidMount() {
    return this.props.loggedInStatus ? this.redirect() : null;
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
      .then(data => (!data.error ? this.props.setAccount(data.attributes) : ""));
  };

  redirect = () => {
    this.props.history.push("/home");
  }

  render() {
    return (
      <div>
        <LoginForm handleOnSubmit={this.handleOnSubmit} />
      </div>
    );
  }
}

export default connect()(LoginContainer);
