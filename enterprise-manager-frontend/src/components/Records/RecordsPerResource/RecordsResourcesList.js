import React from "react";
import cuid from "cuid";
import { NavLink, useRouteMatch } from "react-router-dom";
import { useSelector, shallowEqual } from "react-redux";

const RecordsResourcesList = () => {
  const match = useRouteMatch();
  const { resources } = useSelector(
    ({ resources }) => ({ resources }),
    shallowEqual
  );
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
