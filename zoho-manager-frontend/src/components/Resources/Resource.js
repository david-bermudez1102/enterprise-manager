import React from "react";
import { Link, Route, BrowserRouter as Router, Switch } from "react-router-dom";
import FieldForm from "../Fields/FieldForm";

const Resource = ({ match, resources }) => {
  const resource = resources.find(
    resource => resource.id === parseInt(match.params.resourceId)
  );
  console.log(match.path);
  return resources.length > 0 ? (
    <div>
      <h3>{resource.name}</h3>
      <form>
        {resource.fields.map(field => (
          <input name={field.name} />
        ))}
      </form>
      <Link to={`${match.url}/new`}>Add new field</Link>
      <Switch>
        <Route
          path={`${match.path}/new`}
          render={props => (
            <FieldForm {...props}/>
          )}
        />
      </Switch>
    </div>
  ) : null;
};

export default Resource;
