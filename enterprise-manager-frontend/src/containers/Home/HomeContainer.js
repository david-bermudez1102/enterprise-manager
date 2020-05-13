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
import ResetPassword from "../../components/Accounts/ResetPassword";
import Home from "../../components/Home";
import useSession from "./Hooks/useSession";
import { useSelector, shallowEqual } from "react-redux";
import Route from "../../Router/Route";
import NoMatch from "../../components/NoMatch";
import useMatchedRoute from "../../components/NoMatch/useMatchedRoute";
import { Layout } from "antd";

const { Content, Footer } = Layout;

const HomeContainer = () => {
  const { organizations, admins } = useSelector(
    ({ organizations, admins }) => ({ organizations, admins }),
    shallowEqual
  );
  const location = useLocation();
  const session = useSession();
  const matchedRoute = useMatchedRoute();

  if (organizations.length === 0) return <Redirect to="/organizations/new" />;
  if (admins.length === 0) return <Redirect to="/accounts/new" />;
  return (
    <Layout style={{ minHeight: "100%" }}>
      {session.isLoggedIn ? (
        <SideBar session={session} organizations={organizations} />
      ) : null}
      <Layout className="site-layout">
        {organizations.length > 0 ? (
          <Navbar session={session} organizations={organizations} />
        ) : null}
        <Content
          style={{
            margin: "16px 16px",
            padding: 5,
            position: "relative",
          }}>
          {!matchedRoute && session.isLoggedIn ? (
            <NoMatch />
          ) : (
            <Switch>
              <Route
                path={`/organizations`}
                component={OrganizationContainer}
              />
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
          )}
        </Content>
        <Footer
          style={{
            borderTop: "1px solid #dee2e6",
            height: "48px",
            lineHeight: "48px",
            paddingTop: 0,
            paddingBottom: 0,
          }}>{`${organizations[0].name} © 2020`}</Footer>
      </Layout>
    </Layout>
  );
};

export default React.memo(HomeContainer);
