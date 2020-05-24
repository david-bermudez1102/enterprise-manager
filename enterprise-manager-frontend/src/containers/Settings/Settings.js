import React, { Component } from "react"
import { Switch, NavLink } from "react-router-dom"
import Privileges from "../../components/Settings/Privileges"
import Integrations from "../../components/Settings/Integrations"
import AccountSettings from "../../components/Settings/AccountSettings"
import cuid from "cuid"
import Route from "../../Router/Route"
import { Row, Col, List } from "antd"
import { ApiOutlined } from "@ant-design/icons"

class Settings extends Component {
  render() {
    const { match, organization } = this.props
    const links = [
      {
        text: "Privileges",
        url: `${match.url}/privileges`,
        icon: <i className={`fas fa-user-shield`}></i>
      },
      {
        text: "Integrations",
        url: `${match.url}/integrations`,
        icon: <ApiOutlined />
      },
      {
        text: "Account Settings",
        url: `${match.url}/account`,
        icon: <i className={`fas fa-user-cog`}></i>
      }
    ]
    return (
      <Row gutter={16}>
        <Col lg={12}>
          <List
            itemLayout='horizontal'
            dataSource={links}
            renderItem={item => (
              <List.Item
                style={{
                  background: "#fff",
                  paddingRight: "10px",
                  paddingLeft: "20px"
                }}>
                <NavLink key={cuid()} to={item.url}>
                  {item.icon} {item.text}
                </NavLink>
              </List.Item>
            )}></List>
        </Col>
        <Col lg={12}>
          <Switch>
            <Route path={`${match.path}/privileges`} component={Privileges} />
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
    )
  }
}

export default Settings
