import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import SideBar from "../../components/Home/SideBar/SideBar";
import Navbar from "../../components/Navbar/Navbar";
import LoginContainer from "../LoginContainer";
import OrganizationContainer from "../OrganizationContainer";
import AdminContainer from "../AdminContainer";
import LogoutContainer from "../LogoutContainer";
import AccountsContainer from "../Accounts/AccountsContainer";
import ZohoBooks from "../ZohoBooks/ZohoBooks";
import Footer from "../../components/Footer/Footer";
import ResetPassword from "../../components/Accounts/ResetPassword";

const Home = ({ location, organizations, admins, addSession, removeSession, session }) => (
  <div className="w-100 d-flex flex-grow-1">
    {organizations.length === 0 ? (
      <Redirect to="/organizations/new" />
    ) : admins.length === 0 ? (
      <Redirect to="/accounts/new" />
    ) : null}
    {session.isLoggedIn ? <SideBar session={session} location={location} organizations={organizations} /> : null}
    <div className="w-100 d-flex flex-column min-h-100 flex-wrap">
      {session.isLoggedIn ? <Navbar session={session} organizations={organizations} /> : null}
      <main className={`${!session.isLoggedIn ? "h-100" : ""} w-100 bg-transparent px-4 py-3 position-relative`}>
        <Switch>
          <Route
            path={`/organizations`}
            render={props => <OrganizationContainer session={session} admins={admins} {...props} />}
          />
          <Route path={`/reset_password`} render={() => <ResetPassword />} />
          <Route
            path={`/login`}
            render={props => (
              <LoginContainer
                {...props}
                admins={admins}
                session={session}
                addSession={addSession}
                organizations={organizations}
              />
            )}
          />
          <Route path={`/logout`} render={() => <LogoutContainer removeSession={removeSession} />} />
          <Route path="/accounts/new">
            <AdminContainer organizations={organizations} admins={admins} />
          </Route>
          <Route path={`/accounts`} render={props => <AccountsContainer {...props} session={session} />} />
          <Route
            path={`/auth/zohobooks/callback`}
            render={props => (
              <ZohoBooks
                {...props}
                session={session}
                redirectTo={`/organizations/${organizations[0].id}/settings/integrations/zoho_books/edit`}
                organization={organizations[0]}
              />
            )}
          />
        </Switch>
      </main>
      {session.isLoggedIn ? (
        <div className="d-flex mt-auto w-100">
          <Footer organization={organizations[0]} session={session} />
        </div>
      ) : null}
    </div>
  </div>
);

export default Home;
