import React from "react";
import { NavLink, Route, Switch } from "react-router-dom";
import cuid from "cuid";
import Resource from "./Resource";

const ResourcesList = ({ match, resources }) => {
  return (
    <div className="row">
      <div className="col-lg-4">
        <div className="list-group">
          {resources.map(resource => (
              <NavLink
                key={cuid()}
                to={`${match.url}/${resource.id}`}
                className="list-group-item list-group-item-action"
                activeClassName="active"
              >
                {resource.name}
              </NavLink>
          ))}
        </div>
      </div>
      <Switch>
        <Route
          path={`${match.path}/:resourceId`}
          render={props =>
            props.match.params.resourceId !== "new" ? (
              <Resource key={cuid()} {...props} resources={resources} />
            ) : null
          }
        />
      </Switch>
    </div>
  );
};

export default ResourcesList;
