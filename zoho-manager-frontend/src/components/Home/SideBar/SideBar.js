import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import cuid from "cuid";
import { connect } from "react-redux";

class SideBar extends Component {
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
      <div style={{ width: "150px" }} className="p-0">
        <nav className="nav nav-dark flex-column nav-pills bg-dark min-vh-100">
          {this.state.links.map(link => (
            <NavLink
              to={link.path}
              className="nav-item nav-link"
              key={cuid()}
              activeClassName="active"
            >
              {link.text}
            </NavLink>
          ))}
        </nav>
      </div>
    );
  }
}

const mapStateToProps = ({session}) => {
  return {session}
}

export default connect(mapStateToProps)(SideBar)