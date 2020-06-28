import React, { useState } from "react"
import { useLocation, Link } from "react-router-dom"
import { Menu, Button, Avatar } from "antd"
import defaultAvatar from "../../../default_user.png"
import "./styles.css"

const { SubMenu } = Menu

const SidebarLinks = ({ links, session, collapsed }) => {
  const location = useLocation()
  const { currentUser } = session

  const [openKeys, setOpenKeys] = useState()

  const onOpenChange = openKeys => {
    setOpenKeys([openKeys[openKeys.length - 1]])
  }
  return (
    <Menu
      openKeys={openKeys}
      onOpenChange={onOpenChange}
      theme='dark'
      mode='inline'
      style={{ position: "sticky", top: 0 }}
      selectedKeys={[location.pathname]}
      inlineIndent={16}>
      <Menu.Item
        key={"sidebar_header"}
        className={
          collapsed ? "sidebar-header-collapsed" : "sidebar-header-expanded"
        }>
        <Link to={"/"} style={{ color: "inherit" }}>
          <Avatar src={currentUser.avatarSrc || defaultAvatar} />
          {!collapsed ? (
            <div
              style={{
                display: "inline",
                marginLeft: 5,
                verticalAlign: "middle"
              }}>
              {currentUser.name}
            </div>
          ) : null}
        </Link>
      </Menu.Item>
      {links.map(link =>
        !link.dropdown ? (
          link.everyone ||
          currentUser.isRoot ||
          link.levels.some(l => l.readPrivilege) ? (
            <Menu.Item key={link.path}>
              <Link to={link.path} style={{ color: "inherit" }}>
                <Button
                  type='link'
                  style={{ textAlign: "left", padding: 0, color: "inherit" }}
                  icon={link.icon}
                  block>
                  {link.text}
                </Button>
              </Link>
            </Menu.Item>
          ) : null
        ) : link.everyone ||
          currentUser.isRoot ||
          link.levels.some(
            l =>
              l.createPrivilege ||
              l.updatePrivilege ||
              l.readPrivilege ||
              l.deletePrivilege ||
              l.insertPrivilege
          ) ? (
          <SubMenu
            key={link.path}
            className={
              location.pathname.includes(link.path)
                ? "ant-menu-item-selected"
                : undefined
            }
            title={
              link.levels.some(l => l.readPrivilege) ||
              link.everyone ||
              currentUser.isRoot ? (
                <Link to={link.path} style={{ color: "inherit" }}>
                  <Button
                    type='link'
                    style={{ textAlign: "left", padding: 0, color: "inherit" }}
                    icon={link.icon}
                    block>
                    {link.text}
                  </Button>
                </Link>
              ) : (
                <Button
                  type={"link"}
                  style={{ textAlign: "left", padding: 0, color: "inherit" }}
                  icon={link.icon}
                  block>
                  {link.text}
                </Button>
              )
            }>
            {link.subLinks.map(subLink => (
              <Menu.Item key={subLink.path}>
                <Link to={subLink.path} style={{ color: "inherit" }}>
                  <Button
                    type={"link"}
                    icon={subLink.icon}
                    style={{ textAlign: "left", padding: 0, color: "inherit" }}
                    block>
                    {subLink.text}
                  </Button>
                </Link>
              </Menu.Item>
            ))}
          </SubMenu>
        ) : null
      )}
    </Menu>
  )
}

export default React.memo(SidebarLinks)
