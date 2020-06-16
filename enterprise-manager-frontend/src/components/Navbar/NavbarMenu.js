import React from "react"
import { Menu } from "antd"
import { NavLink } from "react-router-dom"
import Search from "antd/lib/input/Search"

const NavbarMenu = ({ location, session, links, layout }) => {
  return (
    <Menu
      mode={layout}
      selectedKeys={[location.pathname]}
      style={{
        textAlign: "right",
        height: "100%",
        border: 0,
        paddingRight: 24
      }}>
      {session.isLoggedIn ? (
        <Menu.Item
          className={"navbar-menu"}
          key='navbarLinkSearch'
          style={{ lineHeight: "50px" }}>
          <Search
            placeholder='input search text'
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
            !link.loginRequired && !link.hidden ? (
              <Menu.Item key={link.path}>
                <NavLink to={link.path} exact>
                  <i className={link.icon}></i> {link.text}
                </NavLink>
              </Menu.Item>
            ) : null
          )}
    </Menu>
  )
}

export default NavbarMenu
