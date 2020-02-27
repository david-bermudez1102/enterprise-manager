import React, { Component } from "react";
import Navlink from "./Navlink";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      links: [
        {
          path: "/login",
          text: "Login",
          isActive: false,
          loginRequired: false
        },
        { path: "/home", text: "Home", isActive: false, loginRequired: true },
        {
          path: `/organizations/${props.organization.id}/resources/new`,
          text: "Add Resource",
          isActive: false,
          loginRequired: true
        },
        {
          path: `/organizations/${props.organization.id}/resources`,
          text: "Resources",
          isActive: false,
          loginRequired: true
        },
        {
          path: "/logout",
          text: "Logout",
          isActive: false,
          loginRequired: true
        }
      ]
    };
  }

  render() {
    const { session } = this.props
    return (
      <nav className="navbar navbar-dark bg-dark">
        {session.isLoggedIn
          ? this.state.links.map((link, id) =>
              link.loginRequired ? (
                <Navlink key={id} linkTo={link.path} text={link.text} />
              ) : null
            )
          : this.state.links.map((link, id) =>
              !link.loginRequired ? (
                <Navlink key={id} linkTo={link.path} text={link.text} />
              ) : null
            )}
      </nav>
    );
  }
}

export default Navbar;
