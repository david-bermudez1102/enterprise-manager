import React from "react"
import { Menu, Button } from "antd"
import { Link } from "react-router-dom"
import Search from "antd/lib/input/Search"

const NavbarMenu = ({ location, session, links, layout }) => {
  const { currentUser } = session
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
              !link.dropdown ? (
                link.everyone ||
                currentUser.isRoot ||
                link.levels.some(l => l.readPrivilege) ? (
                  <Menu.Item key={link.path}>
                    <Link to={link.path} title={link.text}>
                      <Button
                        type='link'
                        icon={React.cloneElement(link.icon, {
                          ...link.icon.props,
                          style: { ...link.icon.props.style, margin: 0 }
                        })}
                        style={{
                          padding: 0,
                          color: "inherit"
                        }}
                        block
                      />
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
                <Menu.SubMenu
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
                          icon={React.cloneElement(link.icon, {
                            ...link.icon.props,
                            style: { ...link.icon.props.style, margin: 0 }
                          })}
                          style={{
                            padding: 0,
                            color: "inherit"
                          }}
                          style={{
                            padding: 0,
                            color: "inherit"
                          }}
                          block
                        />
                      </Link>
                    ) : (
                      <Button
                        type={"link"}
                        icon={React.cloneElement(link.icon, {
                          ...link.icon.props,
                          style: { ...link.icon.props.style, margin: 0 }
                        })}
                        style={{
                          padding: 0,
                          color: "inherit"
                        }}
                        block
                      />
                    )
                  }>
                  {link.subLinks.map(subLink => (
                    <Menu.Item key={subLink.path}>
                      <Link to={subLink.path} style={{ color: "inherit" }}>
                        <Button
                          type={"link"}
                          icon={subLink.icon}
                          style={{
                            padding: 0,
                            color: "inherit"
                          }}
                          block>
                          {link.text}
                        </Button>
                      </Link>
                    </Menu.Item>
                  ))}
                </Menu.SubMenu>
              ) : null
            ) : null
          )
        : links.map((link, i) =>
            !link.loginRequired && !link.hidden ? (
              <Menu.Item key={link.path}>
                <Link to={link.path}>
                  <Button
                    type={"link"}
                    icon={React.cloneElement(link.icon, {
                      ...link.icon.props,
                      style: { ...link.icon.props.style, margin: 0 }
                    })}
                    style={{
                      padding: 0,
                      color: "inherit"
                    }}
                    block>
                    {link.text}
                  </Button>
                </Link>
              </Menu.Item>
            ) : null
          )}
    </Menu>
  )
}

export default NavbarMenu
