import React from "react"
import { Switch, NavLink } from "react-router-dom"
import Privileges from "../../components/Settings/Privileges/Privileges"
import Integrations from "../../components/Settings/Integrations"
import AccountSettings from "../../components/Settings/AccountSettings"
import Route from "../../Router/Route"
import { Row, Col, Card, Menu, Grid, Button } from "antd"
import Icon, { ApiOutlined } from "@ant-design/icons"

const { useBreakpoint } = Grid

const Settings = props => {
  const screens = useBreakpoint()
  const { location, match, organization } = props
  const links = [
    {
      text: "Privileges",
      url: `${match.url}/privileges`,
      icon: (
        <Icon
          style={{ verticalAlign: 0 }}
          component={() => (
            <i className='fal fa-user-shield' style={{ fontSize: "12px" }}></i>
          )}
        />
      )
    },
    {
      text: "Integrations",
      url: `${match.url}/integrations`,
      icon: <ApiOutlined />
    },
    {
      text: "Account Settings",
      url: `${match.url}/account`,
      icon: (
        <Icon
          style={{ verticalAlign: 0, fontSize: "12px" }}
          component={() => <i className={`fal fa-user-cog`} />}
        />
      )
    }
  ]
  return (
    <Card bordered={false}>
      <Row gutter={16}>
        <Col xxl={5} xl={6} span={24}>
          <Menu
            style={{ height: "100%" }}
            selectedKeys={location.pathname}
            mode={screens["xl"] ? "inline" : "horizontal"}>
            {links.map(item => (
              <Menu.Item key={item.url}>
                <NavLink to={item.url}>
                  <Button
                    type='link'
                    icon={item.icon}
                    style={{ textAlign: "left", padding: 0, color: "inherit" }}
                    block>
                    {item.text}
                  </Button>
                </NavLink>
              </Menu.Item>
            ))}
          </Menu>
        </Col>
        <Col flex={"auto"} span={"auto"}>
          <Switch>
            <Route
              name={"Privileges"}
              path={`${match.path}/privileges`}
              component={Privileges}
            />
            <Route
              path={`${match.path}/integrations`}
              name={"Integrations"}
              render={props => (
                <Integrations {...props} organization={organization} />
              )}
            />
            <Route
              path={`${match.path}/account`}
              name={"Account"}
              render={props => (
                <AccountSettings {...props} organization={organization} />
              )}
            />
          </Switch>
        </Col>
      </Row>
    </Card>
  )
}

export default Settings
