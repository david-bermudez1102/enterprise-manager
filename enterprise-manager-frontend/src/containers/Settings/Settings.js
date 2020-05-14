import React, { Component } from "react";
import { Switch, NavLink } from "react-router-dom";
import Privileges from "../../components/Settings/Privileges";
import Integrations from "../../components/Settings/Integrations";
import AccountSettings from "../../components/Settings/AccountSettings";
import cuid from "cuid";
import Route from "../../Router/Route";
import { Row, Col, List } from "antd";

class Settings extends Component {
  render() {
    const { match, organization } = this.props;
    const links = [
      {
        text: "Privileges",
        url: `${match.url}/privileges`,
        icon: `fas fa-user-shield`,
      },
      {
        text: "Integrations",
        url: `${match.url}/integrations`,
        icon: `fas fa-network-wired`,
      },
      {
        text: "Account Settings",
        url: `${match.url}/account`,
        icon: `fas fa-user-cog`,
      },
    ];
    return (
      <Row gutter={16}>
        <Col lg={12}>
          <List
            itemLayout="horizontal"
            dataSource={links}
            renderItem={item => (
              <List.Item
                style={{
                  background: "#fff",
                  paddingRight: "10px",
                  paddingLeft: "20px",
                }}>
                <NavLink key={cuid()} to={item.url}>
                  <i className={item.icon}></i>
                  {item.text}
                </NavLink>
              </List.Item>
            )}></List>
        </Col>
        <Col lg={12}>
          <Switch>
            <Route path={`${match.path}/privileges`} component={Privileges} />
            <Route
              path={`${match.path}/integrations`}
              render={props => (
                <Integrations {...props} organization={organization} />
              )}
            />
            <Route
              path={`${match.path}/account`}
              render={props => (
                <AccountSettings {...props} organization={organization} />
              )}
            />
          </Switch>
        </Col>
      </Row>
    );
  }
}

export default Settings;
