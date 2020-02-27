import React, { Component } from "react";
import LoginForm from "../components/LoginForm";

class LoginContainer extends Component {

  componentDidMount() {
    const { session } = this.props;
    return session.isLoggedIn ? this.redirect() : null;
  }

  componentDidUpdate() {
    const { session } = this.props;
    return session.isLoggedIn ? this.redirect() : null;
  }

  handleOnSubmit = data => {
    this.props.addSession(data);
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

export default LoginContainer;
