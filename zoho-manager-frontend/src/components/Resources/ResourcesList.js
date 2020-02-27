import React from "react";
import { Link } from "react-router-dom";
import uuid from "react-uuid";

const ResourcesList = ({ match, resources }) => {
  return (
    <div>
      {resources.map(resource => (
        <Link key={uuid()} to={`${match.url}/${resource.id}`}>
          {resource.name}
        </Link>
      ))}
    </div>
  );
};
export default ResourcesList;
