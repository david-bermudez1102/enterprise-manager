import React, { Component } from "react";
import { connect } from "react-redux";
import LoginForm from "../components/LoginForm";

class LoginContainer extends Component {

  componentDidUpdate(prevProps) {
    const { isLoggedIn } = this.props;
    if (prevProps.isLoggedIn !== isLoggedIn) {
      return this.props.isLoggedIn ? this.redirect() : null;
    }
  }

  handleOnSubmit = data => {
    this.props.addSession(data)
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
