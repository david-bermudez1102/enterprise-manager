import React, { useState, useRef, useEffect } from "react"
import OrganizationForm from "../components/Organizations/OrganizationForm"
import { useSelector, useDispatch, shallowEqual } from "react-redux"
import { addOrganization } from "../actions/organizationAction"
import { Switch, useHistory, useRouteMatch } from "react-router-dom"
import ResourcesContainer from "./ResourceCreator/ResourcesContainer"
import Organization from "../components/Organizations/Organization"
import { fetchResources } from "../actions/resourceActions"
import Settings from "./Settings/Settings"
import AllRecordsContainer from "./Records/AllRecordsContainer"
import { FormCard } from "../components/Cards/Cards"
import Route from "../Router/Route"
import RolesContainer from "./Roles/RolesContainer"

const OrganizationContainer = () => {
  const { organizations, resources, session, admins } = useSelector(
    ({ organizations, resources, session, admins }) => ({
      organizations,
      resources,
      session,
      admins
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
      if (organizations.length > 0 && session.isLoggedIn)
        dispatch(fetchResources(organizations[0].id))
    } else {
      setLoaded(false)
      if (organizations.length > 0 && session.isLoggedIn)
        dispatch(fetchResources(organizations[0].id))
      if (organizations.length > 0 && admins.length === 0 && session.isLoggedIn)
        history.push("/accounts/new")
    }
  }, [admins, organizations, dispatch, history, session])

  return (
    <Switch>
      <Route
        path={`${match.path}/new`}
        render={props => (
          <div className='row d-flex h-100 align-items-center justify-content-center'>
            <div className='col-xl-5 col-lg-6 col-md-6 px-0'>
              <FormCard
                header={
                  <span className='card-title mb-0 text-white w-100'>
                    <h2>
                      <i className='fas fa-plus-square mr-2'></i>Create new
                      organization
                    </h2>
                  </span>
                }>
                <OrganizationForm
                  {...props}
                  addOrganization={organization =>
                    dispatch(addOrganization(organization))
                  }
                />
              </FormCard>
            </div>
          </div>
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
            path={`${match.path}/:organizationId/roles`}
            component={RolesContainer}
            name={"Roles"}
          />
          <Route
            path={`${match.path}/:organizationId`}
            name={`${organizations[0].name}`}
            render={props => <Organization {...props} />}
          />
        </>
      ) : null}
    </Switch>
  )
}

export default OrganizationContainer
