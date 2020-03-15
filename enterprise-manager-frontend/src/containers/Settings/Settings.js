import React, { Component } from "react";
import { Switch, Route, NavLink } from "react-router-dom";
import Privileges from "../../components/Settings/Privileges";
import Integrations from "../../components/Settings/Integrations";
import AccountSettings from "../../components/Settings/AccountSettings";
import cuid from "cuid";

class Settings extends Component {
  render() {
    const { match, organization } = this.props;
    const links = [
      {
        text: "Privileges",
        url: `${match.url}/privileges`,
        icon: `fas fa-user-shield mr-2`
      },
      {
        text: "Integrations",
        url: `${match.url}/integrations`,
        icon: `fas fa-network-wired mr-2`
      },
      {
        text: "Account Settings",
        url: `${match.url}/account`,
        icon: `fas fa-user-cog mr-2`
      }
    ];
    return (
      <div className="row">
        <div className="col-lg-5">
          <div className="list-group sticky-top">
            {links.map(link => (
              <NavLink
                className="list-group-item list-group-item-action"
                activeClassName="active"
                key={cuid()}
                to={link.url}>
                <i className={link.icon}></i>
                {link.text}
              </NavLink>
            ))}
          </div>
        </div>
        <div className="col-lg-7">
          <Switch>
            <Route
              path={`${match.path}/privileges`}
              render={props => <Privileges {...props} />}
            />
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
        </div>
      </div>
    );
  }
}

export default Settings;
