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
          icon: "fas fa-briefcase",
          levels: ["admin"]
        },
        {
          path: `/organizations/${props.organizations[0].id}/records`,
          className: `${navLinkClass}`,
          text: "Records",
          icon: "fas fa-th-list",
          levels: ["admin", "manager", "employee"]
        },
        {
          path: "/accounts",
          className: navLinkClass,
          text: "Accounts",
          icon: "fas fa-users-cog mr-n1 pr-2",
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
          className: `${navLinkClass}`,
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
    const { session } = this.props;
    const currentUser = session.currentUser;
    return (
      <div
        className="py-3 bg-secondary sticky-top shadow-lg text-light"
        style={{ minWidth: "200px", fontSize: "16px" }}>
        <div className="px-3 w-100 d-flex align-items-center">
          <span>
            <i
              className="fas fa-user-circle text-light"
              style={{ fontSize: "40px" }}></i>
          </span>
          <span className="ml-2">{currentUser.name}</span>
        </div>
        <hr className="mb-0" style={{ background: "rgba(0,0,0,0.2)" }} />
        <nav
          className="px-2 py-3 nav nav-dark nav-pills flex-column min-h-100 "
          style={{ zIndex: 999 }}>
          {this.state.links.map(link => (
            <span key={cuid()}>
              <NavLink
                exact={link.exact}
                to={link.path}
                className={`${link.className} justify-content-between d-flex mb-1`}
                activeClassName="bg-info active shadow"
                onClick={() => this.toggleDropDown(link.id)}>
                <span>
                  <i className={`${link.icon} mr-2`}></i>
                  {link.text}
                </span>
                <span>
                  {link.dropdown ? (
                    link.status === "open" ? (
                      <i className="fas fa-chevron-down"></i>
                    ) : (
                      <i className="fas fa-chevron-left"></i>
                    )
                  ) : null}
                </span>
              </NavLink>
              {link.dropdown && link.status === "open"
                ? link.subLinks.map(subLink => (
                    <NavLink
                      to={subLink.path}
                      className={`${subLink.className} mt-1`}
                      style={{ backgroundColor: "rgba(0,0,0,0.3)" }}
                      key={cuid()}
                      activeClassName="bg-light text-dark active shadow">
                      <i className="fas fa-chevron-right mr-3"></i>
                      <i className={`${subLink.icon} mr-1`}></i>
                      {subLink.text}
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
