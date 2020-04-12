import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import "./styles.css";
import cuid from "cuid";
import Avatar from "./Avatar";

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
          icon: "fas fa-home",
          textClass: "ml-2",
          iconMin: "fas fa-home"
        },
        {
          path: "/organizations",
          className: navLinkClass,
          exact: true,
          text: "Organizations",
          icon: "fas fa-briefcase",
          iconMin: "fas fa-briefcase",
          textClass: "ml-2",
          levels: ["admin"]
        },
        {
          path: `/organizations/${props.organizations[0].id}/records`,
          className: `${navLinkClass}`,
          text: "Records",
          icon: "fas fa-th-list",
          iconMin: "fas fa-th-list",
          textClass: "ml-2",
          levels: ["admin", "manager", "employee"]
        },
        {
          path: "/accounts",
          className: navLinkClass,
          text: "Accounts",
          icon: "fas fa-users-cog mr-n1",
          iconMin: "fas fa-users-cog",
          levels: ["admin"],
          textClass: "ml-2",
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
          iconMin: "fas fa-layer-group",
          textClass: "ml-2",
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
    return (
      <CSSTransition in={!minimized} timeout={40} classNames="slider" appear>
        <div className="sidebar pt-0 bg-secondary shadow text-light vh-100 sticky-top" style={{ fontSize: "16px" }}>
          <nav className="px-0 py-0 nav nav-dark nav-pills flex-column h-100 d-flex" style={{ zIndex: 999 }}>
            <div className="" onMouseEnter={this.openSideBar} onMouseLeave={this.closeSideBar}>
              <div
                className={`w-100 d-flex align-items-center flex-wrap text-nowrap px-2 justify-content-center`}
                style={{ height: "60.59px" }}>
                <span className="d-flex align-items-center">
                  <Avatar currentUser={currentUser} size="35" />
                  <CSSTransition in={!minimized} timeout={50} classNames="fade" appear>
                    <span className="ml-2">{currentUser.name}</span>
                  </CSSTransition>
                </span>
              </div>
              <hr className="m-0 w-100" style={{ background: "rgba(0,0,0,0.2)" }} />
              <div className="px-2 py-2">
                {links.map(link => (
                  <span key={cuid()}>
                    <NavLink
                      exact={link.exact}
                      to={link.path}
                      className={`${link.className} d-flex mb-1  justify-content-between text-nowrap`}
                      activeClassName="bg-info active shadow"
                      onClick={() => this.toggleDropDown(link.id)}>
                      <span>
                        <i className={link.icon}></i>
                        {!minimized ? (
                          <CSSTransition in={!minimized} timeout={50} classNames="fade">
                            <span className={link.textClass}>{link.text}</span>
                          </CSSTransition>
                        ) : null}
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
                            className={`${subLink.className} mt-1 text-nowrap`}
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
            </div>
            <div className="text-center w-100 justify-content-center flex-wrap mt-auto mb-0">
              <hr className="mb-0" />
              <button className="btn btn-transparent btn-lg text-light shadow-none" onClick={this.toggle}>
                <i
                  className={
                    minimized ? "fad fa-chevron-circle-right display-4" : "fad fa-chevron-circle-left display-4"
                  }
                  style={{ fontSize: "30px" }}></i>
              </button>
            </div>
          </nav>
        </div>
      </CSSTransition>
    );
  }
}
