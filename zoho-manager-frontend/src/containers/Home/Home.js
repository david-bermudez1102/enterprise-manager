import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SideBar from "../../components/Home/SideBar/SideBar";
import Navbar from "../../components/Navbar/Navbar";
import LoginContainer from "../LoginContainer";
import OrganizationContainer from "../OrganizationContainer";
import AdminContainer from "../AdminContainer";
import LogoutContainer from "../LogoutContainer";

class Home extends Component {
  render() {
    const {
      organizations,
      admins,
      addSession,
      removeSession,
      session,
      match
    } = this.props;
    return (
      <div className="w-100 d-flex flex-grow-1">
        {session.isLoggedIn ? <SideBar /> : null}
        <div className="w-100">
          {session.isLoggedIn ? (
            <Navbar session={session} organizations={organizations} />
          ) : null}
          <main className="w-100 align-items-center justify-content-center bg-transparent py-4">
            <Switch>
              <Route
                path={`/organizations`}
                render={props => (
                  <OrganizationContainer session={session} {...props} />
                )}
              />
              <Route
                path={`/login`}
                render={props => (
                  <LoginContainer
                    {...props}
                    session={session}
                    addSession={addSession}
                    organizations={organizations}
                  />
                )}
              />

              <Route
                path={`/logout`}
                render={() => <LogoutContainer removeSession={removeSession} />}
              />
              <Route path="/accounts/new">
                <AdminContainer organizations={organizations} admins={admins} />
              </Route>
            </Switch>
          </main>
        </div>
      </div>
    );
  }
}

export default Home;
