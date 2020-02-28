import React, { Component } from "react";
import LoginForm from "../components/LoginForm";

class LoginContainer extends Component {
  componentDidMount() {
    const { session, organizations } = this.props;
    console.log(organizations)
    return session.isLoggedIn || organizations.length === 0
      ? this.redirect({ session, organizations })
      : null;
  }

  componentDidUpdate() {
    const { session, organizations } = this.props;
    console.log(organizations);
    return session.isLoggedIn || organizations.length === 0
      ? this.redirect({ session, organizations })
      : null;
  }

  handleOnSubmit = data => {
    this.props.addSession(data);
  };

  redirect = props => {
    const { session, organizations } = props;
    if (session.isLoggedIn) this.props.history.push("/home");
    else if (organizations.length === 0)
      this.props.history.push("/organizations/new");
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
