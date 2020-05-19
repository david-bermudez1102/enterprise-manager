import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Menu, Button, Avatar } from "antd";
import defaultAvatar from "../../../default_user.png";
import "./styles.scss";

const { SubMenu } = Menu;

const SidebarLinks = ({ links, session, collapsed }) => {
  const location = useLocation();
  return (
    <Menu
      theme="dark"
      mode="inline"
      style={{ position: "sticky", top: 0 }}
      selectedKeys={[location.pathname]}>
      <Menu.Item
        key={"sidebar_header"}
        className={
          collapsed ? "sidebar-header-collapsed" : "sidebar-header-expanded"
        }>
        <NavLink to={"/"} style={{ color: "#fff" }}>
          <Avatar src={defaultAvatar} />
          {!collapsed ? (
            <div
              style={{
                display: "inline",
                marginLeft: 5,
                verticalAlign: "middle",
              }}>
              {session.currentUser.name}
            </div>
          ) : null}
        </NavLink>
      </Menu.Item>
      <Menu.Divider
        key={"sidebar_divider_1"}
        style={{
          height: 1,
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          margin: 0,
        }}
      />
      {links.map(link =>
        !link.dropdown ? (
          <Menu.Item key={link.path}>
            <NavLink exact={link.exact} to={link.path}>
              <Button
                type="link"
                style={{ textAlign: "left", padding: 0 }}
                icon={link.icon}
                ghost
                block>
                {link.text}
              </Button>
            </NavLink>
          </Menu.Item>
        ) : (
          <SubMenu
            key={link.path}
            className={
              location.pathname.includes(link.path)
                ? "ant-menu-item-selected"
                : undefined
            }
            title={
              <NavLink exact={link.exact} to={link.path}>
                <Button
                  type="link"
                  style={{ textAlign: "left", padding: 0 }}
                  icon={link.icon}
                  ghost
                  block>
                  {link.text}
                </Button>
              </NavLink>
            }>
            {link.subLinks.map(subLink => (
              <Menu.Item key={subLink.path}>
                <NavLink to={subLink.path}>
                  <Button
                    icon={subLink.icon}
                    style={{ textAlign: "left", padding: 0 }}
                    type="link"
                    ghost
                    block>
                    {subLink.text}
                  </Button>
                </NavLink>
              </Menu.Item>
            ))}
          </SubMenu>
        )
      )}
    </Menu>
  );
};

export default React.memo(SidebarLinks);
