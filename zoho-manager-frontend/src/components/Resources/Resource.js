import React from "react";
import FieldsContainer from "../../containers/Fields/FieldsContainer";
import RecordsContainer from "../../containers/Records/RecordsContainer";
import uuid from "react-uuid";

const Resource = ({ match, resources }) => {
  const resource = resources.find(
    resource => resource.id === parseInt(match.params.resourceId)
  );
  return resources.length > 0 ? (
    <div>
      <h3>{resource.name}</h3>
      <FieldsContainer
        key={uuid()}
        match={match}
        organizationId={resource.organizationId}
        resource={resource}
      />
      <RecordsContainer match={match} resource={resource} />
    </div>
  ) : null;
};

export default Resource;
