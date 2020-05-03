import React, { useState, useRef, useEffect } from "react";
import OrganizationForm from "../components/Organizations/OrganizationForm";
import { useSelector, useDispatch } from "react-redux";
import { addOrganization } from "../actions/organizationAction";
import { Route, Switch, useHistory } from "react-router-dom";
import ResourcesContainer from "./ResourceCreator/ResourcesContainer";
import Organization from "../components/Organizations/Organization";
import { fetchResources } from "../actions/resourceActions";
import Settings from "./Settings/Settings";
import AllRecordsContainer from "./Records/AllRecordsContainer";
import { FormCard } from "../components/Cards/Cards";

const OrganizationContainer = props => {
  const { match, admins, session } = props;
  const { organizations, resources } = useSelector(s => s);
  const [loaded, setLoaded] = useState(false);
  const mounted = useRef();
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
    } else {
      if (organizations.length > 0)
        fetchResources(organizations[0].id).then(() => setLoaded(true));
      if (organizations.length > 0 && admins.length === 0)
        history.push("/accounts/new");
    }
  }, [admins, organizations]);

  return (
    <Switch>
      <Route
        path={`${match.path}/new`}
        render={props => (
          <div className="row d-flex h-100 align-items-center justify-content-center">
            <div className="col-xl-5 col-lg-6 col-md-6 px-0">
              <FormCard
                header={
                  <span className="card-title mb-0 text-white w-100">
                    <h2>
                      <i className="fas fa-plus-square mr-2"></i>Create new
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
            render={props => (
              <ResourcesContainer
                {...props}
                resources={resources}
                loaded={loaded}
              />
            )}
          />
          <Route
            path={`${match.path}/:organizationId/records`}
            render={props => (
              <AllRecordsContainer {...props} resources={resources} />
            )}
          />
          <Route
            path={`${match.path}/:organizationId`}
            render={props => <Organization {...props} />}
          />
        </>
      ) : null}
    </Switch>
  );
};

export default OrganizationContainer;
