import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import LoginForm from "../components/LoginForm";

class LoginContainer extends Component {
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
    fetch("/sessions", configObj).then(response => response.json()).then(data => console.log(data))
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
