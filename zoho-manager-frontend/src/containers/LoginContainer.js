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
      <div className="row w-100">
        <div className="col">
          <FormCard
            header={<span className="card-title display-4">Login</span>}
          >
            <LoginForm handleOnSubmit={this.handleOnSubmit} />
          </FormCard>
        </div>
      </div>
    );
  }
}

export default LoginContainer;
