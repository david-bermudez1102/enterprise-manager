import React, { Component } from "react";
import LoginForm from "../components/LoginForm";
import { FormCard } from "../components/Cards/Cards";
import Alert from "../components/Alerts/Alert";

class LoginContainer extends Component {
  componentDidMount() {
    const { session, organizations, admins } = this.props;
    return session.isLoggedIn ||
      organizations.length === 0 ||
      admins.length === 0
      ? this.redirect({ session, organizations, admins })
      : null;
  }

  componentDidUpdate() {
    const { session, organizations, admins } = this.props;
    return session.isLoggedIn ||
      organizations.length === 0 ||
      admins.length === 0
      ? this.redirect({ session, organizations, admins })
      : null;
  }

  handleOnSubmit = data => {
    const { history } = this.props;
    this.props
      .addSession(data)
      .then(acc =>
        acc.token ? history.push(`reset_password?token=${acc.token}`) : null
      );
  };

  redirect = props => {
    const { session, organizations, admins } = props;
    if (session.isLoggedIn) this.props.history.push("/");
    else if (organizations.length === 0)
      this.props.history.push("/organizations/new");
    else if (admins.length === 0) this.props.history.push("/accounts/new");
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
            <Alert />
            <LoginForm handleOnSubmit={this.handleOnSubmit} />
          </FormCard>
        </div>
      </div>
    );
  }
}

export default LoginContainer;
