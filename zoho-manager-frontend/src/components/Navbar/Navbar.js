import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import cuid from "cuid";

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
          path: "/logout",
          text: "Logout",
          isActive: false,
          loginRequired: true
        }
      ]
    };
  }

  componentDidUpdate(prevProps) {
    const { organizations } = this.props;
    if (prevProps.organizations !== organizations) {
      return organizations.length > 0
        ? this.setState({
            ...this.state,
            links: [
              ...this.state.links,
              {
                path: `/organizations/${organizations[0].id}/resources/new`,
                text: "Add Resource",
                isActive: false,
                loginRequired: true
              },
              {
                path: `/organizations/${organizations[0].id}/resources`,
                text: "Resources",
                isActive: false,
                loginRequired: true
              }
            ]
          })
        : null;
    }
  }

  render() {
    const { session } = this.props;
    return (
      <nav className="navbar navbar-dark bg-dark">
        {session.isLoggedIn
          ? this.state.links.map((link, id) =>
              link.loginRequired ? (
                <NavLink
                  key={cuid()}
                  to={link.path}
                  exact
                  activeStyle={{ background: "white" }}
                >
                  {" "}
                  {link.text}
                </NavLink>
              ) : null
            )
          : this.state.links.map((link, id) =>
              !link.loginRequired ? (
                <NavLink
                  key={cuid()}
                  to={link.path}
                  exact
                  activeStyle={{ background: "white" }}
                >
                  {link.text}
                </NavLink>
              ) : null
            )}
      </nav>
    );
  }
}

export default Navbar;
