import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import cuid from "cuid";
import Logo from "./Logo";
import SearchBar from "./SearchBar";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      links: [
        {
          path: "/login",
          text: "Login",
          loginRequired: false
        },
        {
          path: "/",
          text: "Home",
          icon: "fas fa-home",
          loginRequired: true
        },
        {
          path: `/organizations/${props.organizations[0].id}/resources/new`,
          text: "Add Resource",
          icon: "fas fa-plus",
          loginRequired: true
        },
        {
          path: `/organizations/${props.organizations[0].id}/resources`,
          text: "Resources",
          icon: "fas fa-layer-group",
          loginRequired: true
        },
        {
          path: `/organizations/${props.organizations[0].id}/settings`,
          text: "Settings",
          icon: "fas fa-cog",
          loginRequired: true
        },
        {
          path: `/notifications`,
          text: "Notifications",
          icon: "fas fa-bell",
          loginRequired: true
        },
        {
          path: "/logout",
          icon: "fas fa-sign-out-alt",
          text: "Logout",
          loginRequired: true
        }
      ]
    };
  }

  render() {
    const { session, organizations } = this.props;
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm py-0">
        {organizations.length > 0 ? (
          <NavLink to="#" className="navbar-brand">
            <Logo organization={organizations[0]} />
          </NavLink>
        ) : null}
        <div
          className="collapse navbar-collapse d-flex justify-content-end"
          id="navbarNav">
          {session.isLoggedIn ? (
            <SearchBar organization={organizations[0]} />
          ) : null}
          <ul className="navbar-nav nav-pills">
            {session.isLoggedIn
              ? this.state.links.map(link =>
                  link.loginRequired ? (
                    <li className="nav-item" key={cuid()}>
                      <NavLink
                        to={link.path}
                        exact
                        className="nav-link"
                        activeClassName="active bg-light"
                        title={link.text}>
                        <i className={link.icon}></i>
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
                        activeClassName="active bg-light">
                        <i className={link.icon}></i> {link.text}
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
