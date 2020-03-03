import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import cuid from "cuid";

export default class SideBar extends Component {
  constructor(props) {
    super(props);
    const navLinkClass = "nav-item nav-link text-light";
    this.state = {
      links: [
        {
          path: "/",
          className: navLinkClass,
          text: "Home",
          icon: "fas fa-home"
        },
        {
          path: "/organizations",
          className: navLinkClass,
          text: "Organizations",
          icon: "fas fa-sitemap",
          levels: ["admin"]
        },
        {
          path: "/accounts",
          className: navLinkClass,
          text: "Accounts",
          icon: "fas fa-users",
          levels: ["admin"]
        },
        {
          path: "/logout",
          className: `${navLinkClass} dropdown`,
          text: "Resources",
          icon: "fas fa-layer-group",
          levels: ["admin", "manager", "employee"]
        }
      ]
    };
  }

  render() {
    const { session } = this.props;
    const currentUser = session.currentUser;
    return (
      <div
        className="py-3 bg-secondary sticky-top shadow-lg text-light"
        style={{ minWidth: "200px" }}
      >
        <div className="w-100 d-flex align-items-center justify-content-center">
          <i
            className="fad fa-user-circle text-shadow"
            style={{ fontSize: "40px" }}
          ></i>{" "}
          {currentUser.name}
        </div>
        <nav
          className="p-3 nav nav-dark nav-pills flex-column min-vh-100 "
          style={{ zIndex: 999 }}
        >
          {this.state.links.map(link => (
            <NavLink
              exact
              to={link.path}
              className={link.className}
              key={cuid()}
              activeClassName="bg-info active shadow"
            >
              <i className={link.icon}></i> {link.text}
            </NavLink>
          ))}
        </nav>
      </div>
    );
  }
}
