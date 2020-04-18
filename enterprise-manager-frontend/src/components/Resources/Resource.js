import React from "react";
import FieldsContainer from "../../containers/Fields/FieldsContainer";
import RecordsContainer from "../../containers/Records/RecordsContainer";
import { connect } from "react-redux";

const Resource = ({ match, resources, fields, location }) => {
  const resource = resources.find(
    resource => resource.formAlias === match.params.formAlias
  );
  return resource ? (
    <>
      <FieldsContainer
        match={match}
        organizationId={resource.organizationId}
        resource={resource}
        fields={fields}
        location={location}
      />
      <RecordsContainer match={match} resource={resource} />
    </>
  ) : null;
};

const mapStateToProps = ({ fields, resources }) => {
  return {
    fields,
    resources
  };
};

export default connect(mapStateToProps)(Resource);
