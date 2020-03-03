import React from "react";
import { NavLink, Route, Switch } from "react-router-dom";
import cuid from "cuid";
import Resource from "./Resource";

const pluralize = require("pluralize");

const ResourcesList = ({ match, resources }) => {
  return (
    <div className="row w-100">
      <div className="col-lg-4">
        <div className="list-group">
          {resources.map(resource => (
            <NavLink
              key={cuid()}
              to={`${match.url}/${resource.formAlias}`}
              className="list-group-item list-group-item-action"
              activeClassName="active"
            >
              {pluralize(resource.name)}
            </NavLink>
          ))}
        </div>
      </div>
      <Switch>
        <Route
          path={`${match.path}/:formAlias`}
          render={props => (
            <Resource key={cuid()} {...props} resources={resources} />
          )}
        />
      </Switch>
    </div>
  );
};

export default ResourcesList;
