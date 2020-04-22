import React, { useEffect } from "react";
import FieldsContainer from "../../containers/Fields/FieldsContainer";
import { useDispatch, useSelector } from "react-redux";
import { fetchFields } from "../../actions/fieldActions";
import { fetchRecordFields } from "../../actions/recordFieldActions";
import RecordsContainer from "../../containers/Records/RecordsContainer";

const Resource = ({ match, location }) => {
  const resource = useSelector(s =>
    s.resources.find(resource => resource.formAlias === match.params.formAlias)
  );

  const fields = useSelector(s => s.fields);

  const dispatch = useDispatch();

  useEffect(() => {
    if (resource) {
      dispatch(fetchFields(resource.organizationId, resource.id));
      dispatch(fetchRecordFields(resource.organizationId, resource.id));
    }
  }, [resource.organizationId, resource.id]);

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
export default Resource;
