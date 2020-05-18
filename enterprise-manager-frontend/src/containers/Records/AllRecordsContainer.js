import React, { useState, useEffect } from "react";
import {
  Switch,
  useLocation,
  useRouteMatch,
  matchPath,
} from "react-router-dom";
import RecordsResourcesList from "../../components/Records/RecordsPerResource/RecordsResourcesList";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { NoContent } from "../../components/NoContent";
import Route from "../../Router/Route";
import Records from "../../components/Records";
import DeletedRecords from "../../components/Records/DeletedRecords.js";
import { fetchFields } from "../../actions/fieldActions";
import { fetchRecordFields } from "../../actions/recordFieldActions";

const AllRecordsContainer = () => {
  const location = useLocation();
  const match = useRouteMatch();
  const dispatch = useDispatch();
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

  useEffect(() => {
    if (resource) {
      dispatch(fetchFields(resource.organizationId, resource.id));
      dispatch(fetchRecordFields(resource.organizationId, resource.id));
    }
  }, [resource, dispatch]);

  if (resources.length === 0)
    return <NoContent>There are no resources created yet!</NoContent>;

  return (
    <Switch>
      <Route path={`${match.path}/deleted`} component={DeletedRecords} />
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
