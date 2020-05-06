import React, { useState, useEffect } from "react";
import {
  Switch,
  useLocation,
  useRouteMatch,
  matchPath,
} from "react-router-dom";
import RecordsResourcesList from "../../components/Records/RecordsPerResource/RecordsResourcesList";
import RecordsList from "../../components/Records/RecordsList";
import { useSelector, shallowEqual } from "react-redux";
import { NoContent } from "../../components/NoContent";
import Route from "../../Router/Route";
import Records from "../../components/Records";

const AllRecordsContainer = () => {
  const location = useLocation();
  const match = useRouteMatch();
  const path = matchPath(location.pathname, {
    path: `${match.path}/:resourceId`,
  });
  const { params } = path || {};
  const { resourceId } = params || {};
  const { resources } = useSelector(
    ({ resources }) => ({ resources }),
    shallowEqual
  );
  const [resource, setResource] = useState(
    resources.find(resource => resource.id === parseInt(resourceId))
  );

  useEffect(() => {
    setResource(
      resources.find(resource => resource.id === parseInt(resourceId))
    );
  }, [resources, resourceId]);

  if (resources.length === 0)
    return <NoContent>There are no resources created yet!</NoContent>;

  console.log(resource);

  return (
    <Switch>
      <Route
        path={`${match.path}/deleted`}
        render={props => <RecordsList {...props} resource={resource} />}
      />
      {resource ? (
        <Route path={`${match.path}/:resourceId`}>
          <Records resource={resource} />
        </Route>
      ) : null}
      <Route path={match.path} component={RecordsResourcesList} />
    </Switch>
  );
};

export default AllRecordsContainer;
