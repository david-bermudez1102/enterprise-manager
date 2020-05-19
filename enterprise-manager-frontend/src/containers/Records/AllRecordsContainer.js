import React, { useState, useEffect } from "react";
import {
  Switch,
  useLocation,
  useRouteMatch,
  matchPath,
  useHistory,
  Link,
} from "react-router-dom";
import RecordsResourcesList from "../../components/Records/RecordsPerResource/RecordsResourcesList";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { NoContent } from "../../components/NoContent";
import Route from "../../Router/Route";
import Records from "../../components/Records";
import DeletedRecords from "../../components/Records/DeletedRecords.js";
import { fetchFields } from "../../actions/fieldActions";
import { fetchRecordFields } from "../../actions/recordFieldActions";
import { PageHeader } from "antd";
import useCrumbs from "../../components/Crumbs/hooks/useCrumbs";

const routes = [
  {
    path: "index",
    breadcrumbName: "First-level Menu",
  },
  {
    path: "first",
    breadcrumbName: "Second-level Menu",
  },
  {
    path: "second",
    breadcrumbName: "Third-level Menu",
  },
];

const AllRecordsContainer = () => {
  const location = useLocation();
  const match = useRouteMatch();
  const history = useHistory();
  const dispatch = useDispatch();
  const path = matchPath(location.pathname, {
    path: `${match.path}/:formAlias`,
  });
  const { params } = path || {};
  const { formAlias } = params || {};
  const { resources } = useSelector(
    ({ resources }) => ({ resources }),
    shallowEqual
  );
  const [resource, setResource] = useState(
    resources.find(resource => resource.formAlias === formAlias)
  );

  useEffect(() => {
    setResource(resources.find(resource => resource.formAlias === formAlias));
  }, [resources, formAlias, location]);

  useEffect(() => {
    if (resource) {
      dispatch(fetchFields(resource.organizationId, resource.id));
      dispatch(fetchRecordFields(resource.organizationId, resource.id));
    }
  }, [resource, dispatch]);

  const crumbs = useCrumbs();
  function itemRender(route, params, routes, paths) {
    return routes.indexOf(route) === routes.length - 1 ? (
      <span>{route.breadcrumbName}</span>
    ) : (
      <Link to={route.path}>{route.breadcrumbName}</Link>
    );
  }

  console.log(location.pathname, crumbs);
  if (resources.length === 0)
    return <NoContent>There are no resources created yet!</NoContent>;

  return (
    <>
      <PageHeader
        className="site-page-header"
        title={
          crumbs.find(crumb => crumb.path === location.pathname)
            ? crumbs.find(crumb => crumb.path === location.pathname)
                .breadcrumbName
            : null
        }
        breadcrumb={{ routes: crumbs, itemRender }}
        onBack={() => history.goBack()}
        subTitle="This is a subtitle"
      />
      <Switch>
        <Route
          path={`${match.url}/deleted`}
          name={"Deleted Records"}
          component={DeletedRecords}
        />
        {resource ? (
          <Route path={`${match.path}/:formAlias`} name={resource.name}>
            <Records resource={resource} />
          </Route>
        ) : null}
        <Route path={match.path} component={RecordsResourcesList} />
      </Switch>
    </>
  );
};

export default AllRecordsContainer;
