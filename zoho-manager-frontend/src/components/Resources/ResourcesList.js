import React from "react";
import { Link } from "react-router-dom";

const ResourcesList = ({ match, resources }) => {
  return (
    <div>
      {resources.map(resource => (
        <Link key={resource.id} to={`${match.url}/${resource.id}`}>
          {resource.name}
        </Link>
      ))}
    </div>
  );
};
export default ResourcesList;
