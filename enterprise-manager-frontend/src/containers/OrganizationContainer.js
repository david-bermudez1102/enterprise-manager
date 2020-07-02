import React, { useState, useRef, useEffect } from "react"
import OrganizationForm from "../components/Organizations/OrganizationForm"
import { useSelector, useDispatch, shallowEqual } from "react-redux"
import { addOrganization } from "../actions/organizationAction"
import { Switch, useHistory, useRouteMatch } from "react-router-dom"
import ResourcesContainer from "./ResourceCreator/ResourcesContainer"
import Organization from "../components/Organizations/Organization"
import Settings from "./Settings/Settings"
import AllRecordsContainer from "./Records/AllRecordsContainer"
import Route from "../Router/Route"
import RolesContainer from "./Roles/RolesContainer"
import { fetchRoles } from "../actions/rolesActions"
import { Row, Col, Layout, Card } from "antd"
import Title from "antd/lib/typography/Title"
import Wallpaper from "../components/Wallpaper"
import { fetchAccounts } from "../actions/accountActions"
import AccountsContainer from "./Accounts/AccountsContainer"
import OrganizationsList from "../components/Organizations/OrganizationsList"
import { TagsOutlined, PlusCircleOutlined } from "@ant-design/icons"
import PageTabs from "../components/PageTabs"

const OrganizationContainer = () => {
  const { organizations, resources, session, roots } = useSelector(
    ({ organizations, resources, session, roots }) => ({
      organizations,
      resources,
      session,
      roots
    }),
    shallowEqual
  )

  const [loaded, setLoaded] = useState(false)
  const mounted = useRef()
  const dispatch = useDispatch()
  const history = useHistory()
  const match = useRouteMatch()

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true
      setLoaded(false)
    } else {
      setLoaded(false)
      dispatch(fetchRoles(session.currentUser.organizationId))
      if (organizations.length && session.isLoggedIn) {
        dispatch(fetchAccounts(organizations[0].id))
      }
      if (organizations.length > 0 && !roots.length)
        history.push("/accounts/new")
    }
    // eslint-disable-next-line
  }, [roots, organizations, session])

  const tabs = [
    {
      tab: (
        <span>
          <TagsOutlined />
          All Roles
        </span>
      ),
      path: match.url
    },
    {
      tab: (
        <span>
          <PlusCircleOutlined />
          New Role
        </span>
      ),
      path: `${match.url}/new`
    }
  ]

  return (
    <Switch>
      <Route
        path={`${match.path}/new`}
        render={props => (
          <Layout
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              left: 0,
              top: 0,
              zIndex: 0
            }}>
            <Wallpaper />
            <Row justify='center' align='middle' style={{ height: "100%" }}>
              <Col span={24} sm={20} md={18} lg={16} xl={8} xxl={7}>
                <Card
                  bordered={false}
                  style={{ background: "transparent" }}
                  title={
                    <Title level={3}>
                      <i
                        className='fal fa-briefcase'
                        style={{ marginRight: "16px" }}></i>
                      Create new organization
                    </Title>
                  }>
                  <OrganizationForm
                    {...props}
                    addOrganization={organization =>
                      dispatch(addOrganization(organization))
                    }
                  />
                </Card>
              </Col>
            </Row>
          </Layout>
        )}
      />
      {session.isLoggedIn ? (
        <>
          <Route
            path={`${match.path}/:organizationId/settings`}
            name={"Settings"}
            render={props => (
              <Settings
                {...props}
                resources={resources}
                organization={organizations[0]}
              />
            )}
          />
          <Route
            path={`${match.path}/:organizationId/resources`}
            name={"Resources"}
            render={props => <ResourcesContainer {...props} loaded={loaded} />}
          />
          <Route
            path={`${match.path}/:organizationId/records`}
            component={AllRecordsContainer}
            name={"All Records"}
          />
          <Route
            path={`${match.path}/:organizationId/accounts`}
            render={props => <AccountsContainer {...props} />}
            title='Accounts'
            name='Accounts'
          />
          <Route
            path={`${match.path}/:organizationId/roles`}
            component={RolesContainer}
            name={"Roles"}
          />
          <Route
            exact
            path={`${match.path}/:organizationId`}
            name={`${organizations[0].name}`}
            render={props => <Organization {...props} />}
          />
          <Route exact path={match.url}>
            <PageTabs tabs={tabs} />
            <OrganizationsList />
          </Route>
        </>
      ) : null}
    </Switch>
  )
}

export default OrganizationContainer
