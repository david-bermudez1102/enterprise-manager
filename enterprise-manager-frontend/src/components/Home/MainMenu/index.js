import React from "react"
import { Card } from "antd"
import { MoreOutlined, AppstoreOutlined } from "@ant-design/icons"
import IconWrapper from "../../Icons/IconWrapper"
import { shallowEqual, useSelector } from "react-redux"
import { Link } from "react-router-dom"

const MainMenu = () => {
  const { session } = useSelector(({ session }) => ({ session }), shallowEqual)
  const { currentUser } = session
  const { organizationId } = currentUser
  const base = `/organizations/${organizationId}`
  const menu = [
    {
      id: "integrationsLink",
      title: "Integrations",
      icon: "fal fa-plug",
      href: `${base}/settings/integrations`
    },
    {
      id: "accountsLink",
      title: "Accounts",
      icon: "fal fa-users",
      href: `${base}/accounts`
    },
    {
      id: "messagesLink",
      title: "Messages",
      icon: "fal fa-comments-alt",
      href: `${base}/messages`
    },
    {
      id: "rolesLink",
      title: "Roles",
      icon: "fal fa-tags",
      href: `${base}/roles`
    },
    {
      id: "permissionsLink",
      title: "Permissions",
      icon: "fal fa-shield-check",
      href: `${base}/settings/privileges`
    },
    {
      id: "tasksLink",
      title: "Tasks",
      icon: "fal fa-tasks",
      href: `${base}/tasks`
    }
  ]
  return (
    <Card
      style={{
        marginBottom: 16
      }}
      title={
        <>
          <AppstoreOutlined style={{ marginRight: 10 }} />
          Main Menu
        </>
      }
      bordered={false}
      extra={<MoreOutlined />}
      bodyStyle={{
        padding: 0
      }}>
      {menu.map(item => (
        <Link key={item.id} to={item.href}>
          <Card.Grid
            style={{
              display: "flex",
              flex: 1
            }}>
            <Card
              style={{
                width: "100%"
              }}
              bodyStyle={{
                padding: 0,
                width: "100%"
              }}
              bordered={false}>
              <Card.Meta
                avatar={
                  <IconWrapper className={item.icon} style={{ fontSize: 22 }} />
                }
                description={item.title}
                style={{
                  display: "flex",
                  width: "100%",
                  fontSize: 18
                }}
              />
            </Card>
          </Card.Grid>
        </Link>
      ))}
    </Card>
  )
}

export default MainMenu
