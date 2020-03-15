import React, { Component } from "react";
import LoginForm from "../components/LoginForm";
import { FormCard } from "../components/Cards/Cards";

class LoginContainer extends Component {
  componentDidMount() {
    const { session, organizations } = this.props;
    console.log(organizations);
    return session.isLoggedIn || organizations.length === 0
      ? this.redirect({ session, organizations })
      : null;
  }

  componentDidUpdate() {
    const { session, organizations } = this.props;
    return session.isLoggedIn || organizations.length === 0
      ? this.redirect({ session, organizations })
      : null;
  }

  handleOnSubmit = data => {
    this.props.addSession(data);
  };

  redirect = props => {
    const { session, organizations } = props;
    if (session.isLoggedIn) this.props.history.push("/");
    else if (organizations.length === 0)
      this.props.history.push("/organizations/new");
  };

  render() {
    return (
      <div className="row d-flex h-100 align-items-center justify-content-center">
        <div className="col-xl-5 col-lg-6 col-md-6 px-0">
          <FormCard
            header={
              <span
                className="card-title display-4 mb-0"
                style={{ fontSize: "32px" }}>
                Login
              </span>
            }>
            <LoginForm handleOnSubmit={this.handleOnSubmit} />
          </FormCard>
        </div>
      </div>
    );
  }
}

export default LoginContainer;
