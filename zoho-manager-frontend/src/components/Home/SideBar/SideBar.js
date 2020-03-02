import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import cuid from "cuid";

export default class SideBar extends Component {
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

  render() {
    return (
      <nav className="nav nav-dark flex-column nav-pills bg-dark" aria-orientation="vertical">
        {this.state.links.map(link => (
          <NavLink to={link.path} className="nav-item nav-link" key={cuid()} activeClassName="active">
            {link.text}
          </NavLink>
        ))}
      </nav>
    );
  }
}
