import React from "react";

const Resource = ({ match, resources }) => {

  return (
    <div>
      <h3>
        {resources.length > 0 ? resources.find(
          resource => resource.id === parseInt(match.params.resourceId)
        ).name : null}
      </h3>
    </div>
  );
};

export default Resource;
