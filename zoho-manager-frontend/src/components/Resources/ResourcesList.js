import React from "react";
import { NavLink, Link } from "react-router-dom";
import cuid from "cuid";

const pluralize = require("pluralize");

const ResourcesList = ({ match, resources }) => {
  return resources.map(resource => (
    <NavLink
      key={cuid()}
      to={`${match.url}/${resource.formAlias}`}
      className="list-group-item list-group-item-action rounded p-4 mb-1 w-100 d-flex justify-content-between align-items-center  shadow-sm"
      activeClassName="active">
      <span>
        <i className="fas fa-stream mr-1"></i>
        {pluralize(resource.name)}
      </span>
      <Link to={`${match.url}/${resource.formAlias}/records`}>
        <button className="btn btn-lg p-0 m-0">
          <span
            className="badge badge-secondary shadow-sm"
            style={{ minWidth: "60px" }}>
            <i className="fas fa-list-ul"></i> {resource.recordsCount}
          </span>
        </button>
      </Link>
    </NavLink>
  ));
};

export default ResourcesList;
