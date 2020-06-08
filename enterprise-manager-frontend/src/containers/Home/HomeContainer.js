import React from "react"
import { Switch, Redirect } from "react-router-dom"
import SideBar from "../../components/Home/SideBar/SideBar"
import Navbar from "../../components/Navbar/Navbar"
import LoginContainer from "../LoginContainer"
import OrganizationContainer from "../OrganizationContainer"
import AdminContainer from "../AdminContainer"
import LogoutContainer from "../LogoutContainer"
import AccountsContainer from "../Accounts/AccountsContainer"
import ZohoBooks from "../ZohoBooks/ZohoBooks"
import ResetPassword from "../../components/Accounts/ResetPassword"
import Home from "../../components/Home"
import useSession from "./Hooks/useSession"
import { useSelector, shallowEqual } from "react-redux"
import Route from "../../Router/Route"
import NoMatch from "../../components/NoMatch"
import useMatchedRoute from "../../components/NoMatch/useMatchedRoute"
import { Layout, BackTop, Divider } from "antd"
import MainPageHeader from "../../components/MainPageHeader"
import "./styles.scss"
import Text from "antd/lib/typography/Text"

const { Content, Footer } = Layout

const HomeContainer = () => {
  const { organizations, admins } = useSelector(
    ({ organizations, admins }) => ({ organizations, admins }),
    shallowEqual
  )
  const session = useSession()
  const matchedRoute = useMatchedRoute()

  if (organizations.length === 0) return <Redirect to='/organizations/new' />
  if (admins.length === 0) return <Redirect to='/accounts/new' />
  return (
    <Layout style={{ minHeight: "100%" }}>
      {session.isLoggedIn ? (
        <SideBar session={session} organizations={organizations} />
      ) : null}
      <Layout>
        {organizations.length > 0 ? (
          <Navbar session={session} organizations={organizations} />
        ) : null}
        {!matchedRoute ? <NoMatch /> : null}
        <Content
          style={{
            padding: "24px 24px",
            position: "relative",
            display: !matchedRoute ? "none" : undefined
          }}>
          <MainPageHeader except={["/"]} />
          <Switch>
            <Route
              path={`/organizations`}
              component={OrganizationContainer}
              title='Organizations'
              name='Organizations'
            />
            <Route path={`/reset_password`} component={ResetPassword} />
            <Route path={`/login`} component={LoginContainer} />
            <Route path={`/logout`} component={LogoutContainer} />
            <Route path={"/accounts/new"} component={AdminContainer} />
            <Route
              path={`/accounts`}
              render={props => <AccountsContainer {...props} />}
              title='Accounts'
              name='Accounts'
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
            <Route exact path='/' name={"Home"} component={Home} />
          </Switch>
        </Content>
        <BackTop visibilityHeight={100} />
        <Divider style={{ margin: 0 }} />
        <Footer
          style={{
            textAlign: "center",
            height: "80px",
            lineHeight: "80px",
            paddingTop: 0,
            paddingBottom: 0,
            fontSize: 15
          }}>
          <Text type='secondary'>{`${organizations[0].name} © 2020`}</Text>
        </Footer>
      </Layout>
    </Layout>
  )
}

export default React.memo(HomeContainer)
