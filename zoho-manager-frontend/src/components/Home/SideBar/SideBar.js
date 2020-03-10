import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import cuid from "cuid";

export default class SideBar extends Component {
  constructor(props) {
    super(props);
    const navLinkClass = "nav-item nav-link text-light";
    const activePath = props.location.pathname;
    this.state = {
      links: [
        {
          path: "/",
          exact: true,
          className: navLinkClass,
          text: "Home",
          icon: "fas fa-home"
        },
        {
          path: "/organizations",
          className: navLinkClass,
          exact: true,
          text: "Organizations",
          icon: "fas fa-sitemap",
          levels: ["admin"]
        },
        {
          path: "/accounts",
          className: navLinkClass,
          text: "Accounts",
          icon: "fas fa-users",
          levels: ["admin"],
          dropdown: true,
          status: activePath.includes("/accounts") ? "open" : "closed",
          subLinks: [
            {
              path: "/accounts/add",
              text: "Add account",
              icon: "fas fa-user-plus",
              className: `${navLinkClass}`
            }
          ]
        },
        {
          path: `/organizations/${props.organizations[0].id}/resources`,
          dropdown: true,
          className: `${navLinkClass} dropdown`,
          text: "Resources",
          icon: "fas fa-layer-group",
          levels: ["admin", "manager", "employee"],
          subLinks: [
            {
              path: `/organizations/${props.organizations[0].id}/resources/new`,
              text: "New Resource",
              icon: "fas fa-layer-plus",
              className: `${navLinkClass}`
            }
          ]
        }
      ]
    };
  }

  componentDidMount() {
    this.setState({
      links: this.state.links.map((link, id) => {
        return { ...link, id: id };
      })
    });
  }

  toggleDropDown = linkId => {
    this.setState({
      links: this.state.links.map(link =>
        link.dropdown
          ? link.id === linkId
            ? { ...link, status: link.status === "open" ? "closed" : "open" }
            : { ...link, status: "closed" }
          : { ...link }
      )
    });
  };

  render() {
    console.log(this.state);
    const { session } = this.props;
    const currentUser = session.currentUser;
    return (
      <div
        className="py-3 bg-secondary sticky-top shadow-lg text-light"
        style={{ minWidth: "200px" }}>
        <div className="px-3 w-100 d-flex align-items-center">
          <span>
            <i className="fad fa-user-circle" style={{ fontSize: "40px" }}></i>
          </span>
          <span className="ml-2"> {currentUser.name}</span>
        </div>
        <nav
          className="px-2 py-3 nav nav-dark nav-pills flex-column min-h-100 "
          style={{ zIndex: 999 }}>
          {this.state.links.map(link => (
            <span key={cuid()}>
              <NavLink
                exact={link.exact}
                to={link.path}
                className={`${link.className} justify-content-between d-flex`}
                activeClassName="bg-info active shadow"
                onClick={() => this.toggleDropDown(link.id)}>
                <span>
                  <i className={link.icon}></i> {link.text}
                </span>
                <span>
                  {link.dropdown ? (
                    link.status === "open" ? (
                      <i className="fas fa-chevron-down"></i>
                    ) : (
                      <i className="fas fa-chevron-right"></i>
                    )
                  ) : null}
                </span>
              </NavLink>
              {link.dropdown && link.status === "open"
                ? link.subLinks.map(subLink => (
                    <NavLink
                      to={subLink.path}
                      className={`${subLink.className} mt-1 text-center`}
                      style={{ backgroundColor: "rgba(0,0,0,0.8)" }}
                      key={cuid()}
                      activeClassName="bg-light text-dark active shadow">
                      <i className={subLink.icon}></i> {subLink.text}{" "}
                    </NavLink>
                  ))
                : null}
            </span>
          ))}
        </nav>
      </div>
    );
  }
}
