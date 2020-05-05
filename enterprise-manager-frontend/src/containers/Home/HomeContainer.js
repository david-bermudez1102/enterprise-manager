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

const HomeContainer = () => {
  const { organizations, admins } = useSelector(
    ({ organizations, admins }) => ({ organizations, admins }),
    shallowEqual
  );
  const location = useLocation();
  const session = useSession();
  const matchedRoute = useMatchedRoute();
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
          {!matchedRoute && session.isLoggedIn ? <NoMatch /> : null}
          <Switch>
            <Route path={`/organizations`} component={OrganizationContainer} />
            <Route path={`/reset_password`} component={ResetPassword} />
            <Route path={`/login`} component={LoginContainer} />
            <Route path={`/logout`} component={LogoutContainer} />
            <Route path={"/accounts/new"} component={AdminContainer} />
            <Route
              path={`/accounts`}
              render={props => <AccountsContainer {...props} />}
            />
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
            )
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
