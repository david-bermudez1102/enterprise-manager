import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import cuid from "cuid";
import Logo from "./Logo";
import SearchBar from "./SearchBar";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse: false,
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

  collapse = () => {
    this.setState({ collapse: !this.state.collapse });
  };

  render() {
    const { session, organizations } = this.props;
    const { collapse, links } = this.state;

    const collapseClassName = collapse
      ? "collapse navbar-collapse d-block"
      : "collapse navbar-collapse";
    return (
      <nav className="navbar navbar-expand-md navbar-light bg-white shadow-sm py-0 text-center">
        <NavLink to="#" className="navbar-brand">
          <Logo organization={organizations[0]} />
        </NavLink>
        <button className="navbar-toggler" type="button" onClick={this.collapse}>
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={collapseClassName} id="navbarNav">
          <div className="w-100 d-flex justify-content-between">
            {session.isLoggedIn ? (
              <div className="w-50 d-flex order-sm-last order-md-last">
                <SearchBar organization={organizations[0]} />
              </div>
            ) : null}
            <ul className="navbar-nav nav-pills order-sm-first order-md-last">
              {session.isLoggedIn
                ? links.map(link =>
                    link.loginRequired ? (
                      <li className="nav-item" key={cuid()}>
                        <NavLink
                          to={link.path}
                          exact
                          className="nav-link text-dark"
                          activeClassName="active bg-light"
                          title={link.text}
                          onClick={this.collapse}>
                          <i className={link.icon}></i>
                        </NavLink>
                      </li>
                    ) : null
                  )
                : links.map(link =>
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
        </div>
      </nav>
    );
  }
}

export default Navbar;
