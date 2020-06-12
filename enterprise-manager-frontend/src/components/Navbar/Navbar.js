import React from "react"
import { useLocation } from "react-router-dom"
import Logo from "./Logo/Logo"
import { Layout } from "antd"
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons"
import "./styles.scss"
import NavbarMenu from "./NavbarMenu"
const { Header } = Layout

const Navbar = props => {
  const { session, organizations, isSiderCollapsed, trigger } = props
  const location = useLocation()
  const links = [
    {
      path: "/login",
      text: "Login",
      icon: "fal fa-sign-in-alt",
      loginRequired: false
    },
    {
      path: "/",
      text: "Home",
      icon: "fal fa-home",
      loginRequired: true
    },
    {
      path: `/organizations/${organizations[0].id}/resources/new`,
      text: "Add Resource",
      icon: "fal fa-plus",
      loginRequired: true
    },
    {
      path: `/organizations/${organizations[0].id}/resources`,
      text: "Resources",
      icon: "fal fa-layer-group",
      loginRequired: true
    },
    {
      path: `/organizations/${organizations[0].id}/settings`,
      text: "Settings",
      icon: "fal fa-cog",
      loginRequired: true
    },
    {
      path: `/notifications`,
      text: "Notifications",
      icon: "fal fa-bell",
      loginRequired: true
    },
    {
      path: "/logout",
      icon: "fal fa-sign-out-alt",
      text: "Logout",
      loginRequired: true
    }
  ]

  return (
    <Header
      className='shadow-sm'
      style={{
        zIndex: 2,
        width: "100%",
        position: "sticky",
        padding: 0,
        left: 0,
        top: 0,
        height: 50
      }}>
      <div className='logo'>
        {session.isLoggedIn
          ? React.createElement(
              isSiderCollapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: "trigger",
                onClick: trigger
              }
            )
          : null}
        <Logo organization={organizations[0]} width={105} height={40} />
      </div>
      <NavbarMenu {...{ location, session, links }} layout={"horizontal"} />
    </Header>
  )
}

export default Navbar
