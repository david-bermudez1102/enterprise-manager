import React from "react";
import FieldsContainer from "../../containers/Fields/FieldsContainer";
import RecordsContainer from "../../containers/Records/RecordsContainer";
import cuid from "cuid";

const Resource = ({ match, resources }) => {
  const resource = resources.find(
    resource => resource.id === parseInt(match.params.resourceId)
  );
  return resources.length > 0 ? (
    <div>
      <h3>{resource.name}</h3>
      <FieldsContainer
        key={cuid()}
        match={match}
        organizationId={resource.organizationId}
        resource={resource}
      />
      <RecordsContainer key={cuid()} match={match} resource={resource} />
    </div>
  ) : null;
};

export default Resource;
