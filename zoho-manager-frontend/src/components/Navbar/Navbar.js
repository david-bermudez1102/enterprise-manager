import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import cuid from "cuid";
import Logo from "./Logo";

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
        { path: "/", text: "Home", isActive: false, loginRequired: true },
        {
          path: "/logout",
          text: "Logout",
          isActive: false,
          loginRequired: true
        }
      ]
    };
  }

  componentDidMount() {
    const { organizations } = this.props;
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

  render() {
    const { session, organizations } = this.props;
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-lg">
        {organizations.length > 0 ? (
          <NavLink to="#" className="navbar-brand">
            <Logo organization={organizations[0]} />
          </NavLink>
        ) : null}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav nav-pills">
            {session.isLoggedIn
              ? this.state.links.map(link =>
                  link.loginRequired ? (
                    <li className="nav-item" key={cuid()}>
                      <NavLink
                        to={link.path}
                        exact
                        className="nav-link"
                        activeClassName="active bg-secondary"
                      >
                        {" "}
                        {link.text}
                      </NavLink>
                    </li>
                  ) : null
                )
              : this.state.links.map(link =>
                  !link.loginRequired ? (
                    <li className="nav-item" key={cuid()}>
                      <NavLink
                        to={link.path}
                        exact
                        className="nav-link"
                        activeClassName="active"
                      >
                        {link.text}
                      </NavLink>
                    </li>
                  ) : null
                )}
          </ul>
        </div>
      </nav>
    );
  }
}

export default Navbar;
