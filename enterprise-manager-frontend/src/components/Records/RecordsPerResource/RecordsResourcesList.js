import React from "react";
import cuid from "cuid";
import { NavLink } from "react-router-dom";

const RecordsResourcesList = ({ match, resources }) => {
  return (
    <div className="list-group">
      {resources.map(resource => (
        <NavLink
          className="list-group-item list-group-item-action"
          activeClassName="active"
          to={`${match.url}/${resource.id}`}
          key={cuid()}>
          {resource.name}
        </NavLink>
      ))}
    </div>
  );
};

export default RecordsResourcesList;
