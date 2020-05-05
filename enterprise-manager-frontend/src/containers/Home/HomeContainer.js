import React from "react";
import { Switch, Redirect, useLocation } from "react-router-dom";
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
import Home from "../../components/Home";
import useSession from "./Hooks/useSession";
import { useSelector, shallowEqual } from "react-redux";
import Route from "../../Router/Route";
import NoMatch from "../../components/NoMatch";
import useMatchedRoute from "../../components/NoMatch/useMatchedRoute";
import cuid from "cuid";

const HomeContainer = () => {
  const { organizations, admins } = useSelector(
    ({ organizations, admins }) => ({ organizations, admins }),
    shallowEqual
  );
  const location = useLocation();
  const session = useSession();
  const matchedRoute = useMatchedRoute();

  const key = cuid();
  console.log(key);
  return (
    <div className="w-100 d-flex flex-grow-1">
      {organizations.length === 0 ? (
        <Redirect to="/organizations/new" />
      ) : admins.length === 0 ? (
        <Redirect to="/accounts/new" />
      ) : null}
      {session.isLoggedIn ? (
        <SideBar
          session={session}
          location={location}
          organizations={organizations}
        />
      ) : null}
      <div className="w-100 d-flex flex-column min-h-100 flex-nowrap">
        {session.isLoggedIn ? (
          <Navbar session={session} organizations={organizations} />
        ) : null}
        <main
          className={`${
            !session.isLoggedIn ? "h-100" : ""
          } w-100 bg-transparent px-4 py-3 position-relative h-100`}>
          {!matchedRoute ? <NoMatch /> : null}
          <Switch>
            <Route
              path={`/organizations`}
              render={props => (
                <OrganizationContainer
                  session={session}
                  admins={admins}
                  {...props}
                />
              )}
            />
            <Route path={`/reset_password`} render={() => <ResetPassword />} />
            <Route
              path={`/login`}
              render={props => (
                <LoginContainer
                  {...props}
                  admins={admins}
                  session={session}
                  organizations={organizations}
                />
              )}
            />
            <Route path={`/logout`} render={() => <LogoutContainer />} />
            <Route path="/accounts/new">
              <AdminContainer organizations={organizations} admins={admins} />
            </Route>
            <Route
              path={`/accounts`}
              render={props => (
                <AccountsContainer {...props} session={session} />
              )}
            />
            {!session.isLoggedIn ? (
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
            ) : null}
            <Route exact path="/" component={Home} />
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
};

export default React.memo(HomeContainer);
