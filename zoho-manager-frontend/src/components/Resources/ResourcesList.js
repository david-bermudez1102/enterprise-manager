import React from "react";
import { NavLink, Route, Switch, Link } from "react-router-dom";
import cuid from "cuid";
import Resource from "./Resource";

const pluralize = require("pluralize");

const ResourcesList = ({ match, resources }) => {
  return (
    <div className="row w-100">
      <div className="col-lg-4">
        <div className="list-group border-0">
          {resources.map(resource => (
            <NavLink
              key={cuid()}
              to={`${match.url}/${resource.formAlias}`}
              className="list-group-item list-group-item-action rounded p-4 my-1 w-100 d-flex justify-content-between align-items-center  shadow-sm"
              activeClassName="active">
              {pluralize(resource.name)}
              <Link to={`${match.url}/${resource.formAlias}/records`}>
                <button className="btn btn-lg p-0 m-0">
                  <span
                    class="badge badge-secondary shadow-sm"
                    style={{ minWidth: "60px" }}>
                    <i className="fas fa-list-ul"></i> {resource.recordsCount}
                  </span>
                </button>
              </Link>
            </NavLink>
          ))}
        </div>
      </div>
      <Switch>
        <Route
          path={`${match.path}/:formAlias`}
          render={props => <Resource key={cuid()} {...props} />}
        />
      </Switch>
    </div>
  );
};

export default ResourcesList;
