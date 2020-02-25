import React from "react";
import FieldsContainer from "../../containers/Fields/FieldsContainer";

const Resource = ({ match, resources }) => {
  const resource = resources.find(
    resource => resource.id === parseInt(match.params.resourceId)
  );
  return resources.length > 0 ? (
    <div>
      <h3>{resource.name}</h3>
      <FieldsContainer
        match={match}
        organizationId={resource.organizationId}
        resourceId={resource.id}
      />
    </div>
  ) : null;
};

export default Resource;
