import React, { useState, useEffect } from "react"
import { Switch, Redirect, useLocation } from "react-router-dom"
import SideBar from "../../components/Home/SideBar/SideBar"
import Navbar from "../../components/Navbar/Navbar"
import LoginContainer from "../LoginContainer"
import OrganizationContainer from "../OrganizationContainer"
import LogoutContainer from "../LogoutContainer"
import ZohoBooks from "../ZohoBooks/ZohoBooks"
import ResetPassword from "../../components/Accounts/ResetPassword"
import Home from "../../components/Home"
import useSession from "./Hooks/useSession"
import { useSelector, shallowEqual, useDispatch } from "react-redux"
import Route from "../../Router/Route"
import NoMatch from "../../components/NoMatch"
import useMatchedRoute from "../../components/NoMatch/useMatchedRoute"
import { Layout, BackTop, Divider } from "antd"
import MainPageHeader from "../../components/MainPageHeader"
import "./styles.scss"
import Text from "antd/lib/typography/Text"
import HomeSettings from "./HomeSettings"
import RootContainer from "../RootContainer"
import useForbidden from "../../components/Forbidden/Hooks/useForbidden"
import Forbidden from "../../components/Forbidden"
import { fetchPagePermissions } from "../../actions/pagePermissionsActions"

const { Content, Footer } = Layout

const HomeContainer = ({ organization }) => {
  const location = useLocation()
  const { organizations, roots, sidebar } = useSelector(
    ({ organizations, roots, sidebar }) => ({ organizations, roots, sidebar }),
    shallowEqual
  )
  const session = useSession()
  const dispatch = useDispatch()
  const matchedRoute = useMatchedRoute()

  const [isSiderCollapsed, setIsSiderCollapsed] = useState(sidebar.collapsed)

  const handleCollapse = () => {
    setIsSiderCollapsed(!isSiderCollapsed)
    dispatch({ type: "SET-COLLAPSED", collapsed: !isSiderCollapsed })
  }

  const isForbidden = useForbidden({ organization })

  useEffect(() => {
    if (session.isLoggedIn) dispatch(fetchPagePermissions(organization.id))
  }, [session, organization])

  if (organizations.length === 0 && location.pathname !== "/organizations/new")
    return <Redirect to='/organizations/new' />
  if (
    organizations.length &&
    roots.length === 0 &&
    location.pathname !== "/accounts/new"
  )
    return <Redirect to='/accounts/new' />

  return (
    <Layout style={{ minHeight: "100%", width: "100%" }}>
      {session.isLoggedIn ? (
        <SideBar
          session={session}
          organizations={organizations}
          collapsed={isSiderCollapsed}
          handleCollapse={handleCollapse}
        />
      ) : null}
      <Layout style={{ width: "100%", position: "relative" }}>
        {organizations.length > 0 ? (
          <Navbar
            session={session}
            organization={organization}
            organizations={organizations}
            isSiderCollapsed={isSiderCollapsed}
            trigger={handleCollapse}
          />
        ) : null}
        {!matchedRoute ? <NoMatch /> : null}
        <Content
          style={{
            padding: "24px 24px",
            position: "relative",
            width: "100%",
            display: !matchedRoute ? "none" : undefined
          }}>
          <MainPageHeader except={["/", "/accounts/new", "/login"]} />
          <HomeSettings />
          {isForbidden ? (
            <Forbidden />
          ) : (
            <Switch>
              <Route
                path={`/organizations`}
                component={OrganizationContainer}
                title='Organizations'
                name='Organizations'
              />
              <Route
                path={`/reset_password`}
                title='Reset Password'
                name='Reset Password'
                component={ResetPassword}
              />
              <Route path={`/login`} component={LoginContainer} />
              <Route path={`/logout`} component={LogoutContainer} />
              <Route path={"/accounts/new"} component={RootContainer} />
              <Route
                path={`/auth/zohobooks/callback`}
                render={props => (
                  <ZohoBooks
                    {...props}
                    session={session}
                    redirectTo={`/organizations/${organization.id}/settings/integrations/zoho_books/edit`}
                    organization={organization}
                  />
                )}
              />
              )
              <Route exact path='/' name={"Home"} component={Home} />
            </Switch>
          )}
        </Content>
        <BackTop visibilityHeight={100} />
        <Divider style={{ margin: 0 }} />
        {organization ? (
          <Footer
            style={{
              textAlign: "center",
              height: "80px",
              lineHeight: "80px",
              paddingTop: 0,
              paddingBottom: 0,
              fontSize: 15
            }}>
            <Text type='secondary'>{`${organization.name} © 2020`}</Text>
          </Footer>
        ) : null}
      </Layout>
    </Layout>
  )
}

export default React.memo(HomeContainer)
