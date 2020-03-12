import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import SideBar from "../../components/Home/SideBar/SideBar";
import Navbar from "../../components/Navbar/Navbar";
import LoginContainer from "../LoginContainer";
import OrganizationContainer from "../OrganizationContainer";
import AdminContainer from "../AdminContainer";
import LogoutContainer from "../LogoutContainer";
import AccountsContainer from "../Accounts/AccountsContainer";
import ZohoBooks from "../ZohoBooks/ZohoBooks";

class Home extends Component {
  render() {
    const {
      location,
      organizations,
      admins,
      addSession,
      removeSession,
      session
    } = this.props;
    return (
      <div className="w-100 d-flex flex-grow-1">
        {session.isLoggedIn ? (
          <SideBar
            session={session}
            location={location}
            organizations={organizations}
          />
        ) : null}
        <div className="w-100">
          {session.isLoggedIn ? (
            <Navbar session={session} organizations={organizations} />
          ) : null}
          <main className="w-100 align-items-center justify-content-center bg-transparent p-4">
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
              <Route
                path={`/accounts`}
                render={props => (
                  <AccountsContainer {...props} session={session} />
                )}
              />
              {organizations.length > 0 ? (
                <Route
                  path={`/auth/zohobooks/callback`}
                  render={props => (
                    <ZohoBooks
                      {...props}
                      session={session}
                      organization={organizations[0]}
                    />
                  )}
                />
              ) : null}
            </Switch>
          </main>
        </div>
      </div>
    );
  }
}

export default Home;
