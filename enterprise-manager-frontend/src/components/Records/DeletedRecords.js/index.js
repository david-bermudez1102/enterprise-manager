import React, { useState, useEffect } from "react";
import {
  Switch,
  useRouteMatch,
  useLocation,
  matchPath,
} from "react-router-dom";
import Route from "../../../Router/Route";
import { useSelector, shallowEqual } from "react-redux";
import { NoContent } from "../../NoContent";
import Records from "..";

const DeletedRecords = () => {
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

  return (
    <Switch>
      <Route path={`${match.path}/:resourceId`}>
        <Records resource={resource} deleted />
      </Route>
    </Switch>
  );
};

export default DeletedRecords;
