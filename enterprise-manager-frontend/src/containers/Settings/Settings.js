import React, { Component } from "react"
import { Switch, NavLink } from "react-router-dom"
import Privileges from "../../components/Settings/Privileges/Privileges"
import Integrations from "../../components/Settings/Integrations"
import AccountSettings from "../../components/Settings/AccountSettings"
import Route from "../../Router/Route"
import { Row, Col, Card, Menu } from "antd"
import { ApiOutlined } from "@ant-design/icons"

class Settings extends Component {
  render() {
    const { location, match, organization } = this.props
    const links = [
      {
        text: "Privileges",
        url: `${match.url}/privileges`,
        icon: (
          <i
            className={`fas fa-user-shield`}
            style={{ marginRight: "5px" }}></i>
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
          <i className={`fas fa-user-cog`} style={{ marginRight: "5px" }}></i>
        )
      }
    ]
    return (
      <Card bordered={false}>
        <Row gutter={16}>
          <Col xxl={5} xl={6} lg={7} md={10} span={24}>
            <Menu
              style={{ height: "100%" }}
              selectedKeys={location.pathname}
              mode={"inline"}>
              {links.map(item => (
                <Menu.Item style={{ textAlign: "left" }} key={item.url}>
                  <NavLink to={item.url}>
                    {item.icon}
                    {item.text}
                  </NavLink>
                </Menu.Item>
              ))}
            </Menu>
          </Col>
          <Col flex={"auto"}>
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
}

export default Settings
