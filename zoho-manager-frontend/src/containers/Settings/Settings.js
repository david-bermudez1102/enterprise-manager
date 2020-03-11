import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import Privileges from "../../components/Settings/Privileges";
import Integrations from "../../components/Settings/Integrations";
import AccountSettings from "../../components/Settings/AccountSettings";

class Settings extends Component {
  render() {
    const { match, organization } = this.props;
    return (
      <div className="row">
        <div className="col-lg-5">
          <div className="list-group">
            <Link to={`${match.url}/privileges`}>Privileges</Link>
            <Link to={`${match.url}/integrations`}>Integrations</Link>
            <Link to={`${match.url}/account`}>Account Setttings</Link>
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
