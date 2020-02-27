import React from "react";
import { Link } from "react-router-dom";
import cuid from "cuid";

const ResourcesList = ({ match, resources }) => {
  return (
    <div>
      {resources.map(resource => (
        <Link key={cuid()} to={`${match.url}/${resource.id}`}>
          {resource.name}
        </Link>
      ))}
    </div>
  );
};
export default ResourcesList;
