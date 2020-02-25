import React from "react";
import { Link, Route, BrowserRouter as Router, Switch } from "react-router-dom";
import FieldsList from "../Fields/FieldsList";
import FieldsContainer from "../../containers/Fields/FieldsContainer";

const Resource = ({ match, resources }) => {
  const resource = resources.find(
    resource => resource.id === parseInt(match.params.resourceId)
  );
  return resources.length > 0 ? (
    <div>
      <h3>{resource.name}</h3>
      <FieldsList fields={resource.fields} />
      <Link to={`${match.url}/fields/new`}>Add new field</Link>
      <Switch>
        <Route
          path={`${match.path}/fields/new`}
          render={props => (
            <FieldsContainer
              {...props}
              organizationId={organizationId}
              resourceId={resource.id}
            />
          )}
        />
      </Switch>
    </div>
  ) : null;
};

export default Resource;
