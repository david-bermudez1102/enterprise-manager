import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import Logo from "./Logo/Logo";
import Search from "antd/lib/input/Search";
import { Layout, Menu } from "antd";
const { Header } = Layout;

const Navbar = props => {
  const { session, organizations } = props;
  const location = useLocation();
  const links = [
    {
      path: "/login",
      text: "Login",
      icon: "fas fa-sign-in-alt",
      loginRequired: false,
    },
    {
      path: "/",
      text: "Home",
      icon: "fas fa-home",
      loginRequired: true,
    },
    {
      path: `/organizations/${organizations[0].id}/resources/new`,
      text: "Add Resource",
      icon: "fas fa-plus",
      loginRequired: true,
    },
    {
      path: `/organizations/${organizations[0].id}/resources`,
      text: "Resources",
      icon: "fas fa-layer-group",
      loginRequired: true,
    },
    {
      path: `/organizations/${organizations[0].id}/settings`,
      text: "Settings",
      icon: "fas fa-cog",
      loginRequired: true,
    },
    {
      path: `/notifications`,
      text: "Notifications",
      icon: "fas fa-bell",
      loginRequired: true,
    },
    {
      path: "/logout",
      icon: "fas fa-sign-out-alt",
      text: "Logout",
      loginRequired: true,
    },
  ];

  return (
    <Header
      className="shadow-sm"
      style={{
        zIndex: 1,
        width: "100%",
        background: "#fff",
        position: "sticky",
        top: 0,
      }}>
      <Logo organization={organizations[0]} width={180} height={40} />
      <Menu
        mode="horizontal"
        selectedKeys={[location.pathname]}
        style={{ textAlign: "right", height: "100%", border: 0 }}>
        {session.isLoggedIn ? (
          <Menu.Item key="navbarLinkSearch">
            <Search
              placeholder="input search text"
              onSearch={value => console.log(value)}
              style={{ width: 200 }}
            />
          </Menu.Item>
        ) : null}
        {session.isLoggedIn
          ? links.map((link, i) =>
              link.loginRequired ? (
                <Menu.Item key={link.path}>
                  <NavLink to={link.path} exact title={link.text}>
                    <i className={link.icon}></i>
                  </NavLink>
                </Menu.Item>
              ) : null
            )
          : links.map((link, i) =>
              !link.loginRequired ? (
                <Menu.Item key={link.path}>
                  <NavLink to={link.path} exact>
                    <i className={link.icon}></i> {link.text}
                  </NavLink>
                </Menu.Item>
              ) : null
            )}
      </Menu>
    </Header>
  );
};

export default Navbar;
