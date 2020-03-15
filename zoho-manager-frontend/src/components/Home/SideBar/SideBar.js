import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import cuid from "cuid";

export default class SideBar extends Component {
  constructor(props) {
    super(props);
    const navLinkClass = "nav-item nav-link text-light";
    const activePath = props.location.pathname;
    this.state = {
      minimized: false,
      minimizedFromToggle: false,
      links: [
        {
          path: "/",
          exact: true,
          className: navLinkClass,
          text: "Home",
          icon: "fas fa-home mr-2",
          iconMin: "fas fa-home"
        },
        {
          path: "/organizations",
          className: navLinkClass,
          exact: true,
          text: "Organizations",
          icon: "fas fa-briefcase mr-2",
          iconMin: "fas fa-briefcase",
          levels: ["admin"]
        },
        {
          path: `/organizations/${props.organizations[0].id}/records`,
          className: `${navLinkClass}`,
          text: "Records",
          icon: "fas fa-th-list mr-2",
          iconMin: "fas fa-th-list",
          levels: ["admin", "manager", "employee"]
        },
        {
          path: "/accounts",
          className: navLinkClass,
          text: "Accounts",
          icon: "fas fa-users-cog mr-n1 pr-2 mr-2",
          iconMin: "fas fa-users-cog",
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
          icon: "fas fa-layer-group mr-2",
          iconMin: "fas fa-layer-group",
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

  toggle = () => {
    this.setState({
      minimized: this.state.minimized ? false : true,
      minimizedFromToggle: this.state.minimizedFromToggle ? false : true
    });
  };

  openSideBar = () => {
    if (this.state.minimizedFromToggle) this.setState({ minimized: false });
  };

  closeSideBar = () => {
    if (this.state.minimizedFromToggle) this.setState({ minimized: true });
  };

  render() {
    const { session } = this.props;
    const currentUser = session.currentUser;
    const { minimized, links } = this.state;
    const minWidth = minimized ? "70px" : "205px";
    return (
      <div
        className="py-3 bg-secondary shadow-lg text-light"
        style={{ minWidth, fontSize: "16px" }}>
        <nav
          className="px-0 py-0 nav nav-dark nav-pills flex-column sticky-top"
          style={{ zIndex: 999 }}>
          <div
            className={`w-100 d-flex align-items-center flex-wrap ${
              minimized
                ? "px-0 justify-content-center"
                : "px-3 justify-content-between"
            }`}>
            <span
              className={
                minimized
                  ? "w-100 order-2 text-center"
                  : "d-flex align-items-center"
              }>
              <i
                className={`fas fa-user-circle text-light ${
                  !minimized ? "mr-2" : null
                }`}
                style={{ fontSize: "30px" }}></i>
              {!minimized ? currentUser.name : null}
            </span>
            <span className={minimized ? "w-100 order-1 text-center" : null}>
              <button
                className="btn btn-transparent text-light p-0 m-0"
                onClick={this.toggle}>
                <i className="fas fa-bars"></i>
              </button>
              {minimized ? (
                <hr
                  className="mb-3 w-100"
                  style={{ background: "rgba(0,0,0,0.2)" }}
                />
              ) : null}
            </span>
          </div>
          <hr
            className="mb-0 w-100"
            style={{ background: "rgba(0,0,0,0.2)" }}
          />
          <div
            className="px-2 py-2"
            onMouseEnter={this.openSideBar}
            onMouseLeave={this.closeSideBar}>
            {links.map(link => (
              <span key={cuid()}>
                <NavLink
                  exact={link.exact}
                  to={link.path}
                  className={`${link.className} d-flex mb-1 ${
                    minimized
                      ? "justify-content-center"
                      : "justify-content-between"
                  }`}
                  activeClassName="bg-info active shadow"
                  onClick={() => this.toggleDropDown(link.id)}>
                  <span>
                    <i className={!minimized ? link.icon : link.iconMin}></i>
                    {!minimized ? link.text : null}
                  </span>

                  {link.dropdown && !minimized ? (
                    link.status === "open" ? (
                      <span>
                        <i className="fas fa-chevron-down"></i>
                      </span>
                    ) : (
                      <span>
                        <i className="fas fa-chevron-left"></i>
                      </span>
                    )
                  ) : null}
                </NavLink>
                {link.dropdown && link.status === "open" && !minimized
                  ? link.subLinks.map(subLink => (
                      <NavLink
                        to={subLink.path}
                        className={`${subLink.className} mt-1`}
                        style={{ backgroundColor: "rgba(0,0,0,0.3)" }}
                        key={cuid()}
                        activeClassName="bg-light text-dark active shadow">
                        <i className={`fas fa-chevron-right mr-3`}></i>
                        <i className={`${subLink.icon} mr-1`}></i>
                        {subLink.text}
                      </NavLink>
                    ))
                  : null}
              </span>
            ))}
          </div>
        </nav>
      </div>
    );
  }
}
