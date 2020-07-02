import React from "react"
import { useLocation } from "react-router-dom"
import Logo from "./Logo/Logo"
import { Layout } from "antd"
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons"
import "./styles.scss"
import NavbarMenu from "./NavbarMenu"
import useLinks from "../../Router/Hooks/useLinks"
const { Header } = Layout

const Navbar = props => {
  const {
    session,
    organizations,
    isSiderCollapsed,
    trigger,
    organization
  } = props
  const location = useLocation()
  const { links } = useLinks({
    organization,
    exclude: ["Organization", "Record", "Account", "Role"]
  })

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
        {organization.logo && (
          <Logo organization={organization} width={105} height={40} />
        )}
      </div>
      <NavbarMenu {...{ location, session, links }} layout={"horizontal"} />
    </Header>
  )
}

export default Navbar
