import React, { useEffect } from "react";
import FieldsContainer from "../../containers/Fields/FieldsContainer";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { fetchFields } from "../../actions/fieldActions";
import { fetchRecordFields } from "../../actions/recordFieldActions";
import RecordsContainer from "../../containers/Records/RecordsContainer";
import { useRouteMatch, useLocation } from "react-router-dom";
import { Col } from "antd";

const Resource = ({ isFieldsPath }) => {
  const location = useLocation();
  const match = useRouteMatch();

  const { resources, fields } = useSelector(
    ({ resources, fields }) => ({ resources, fields }),
    shallowEqual
  );

  const resource = resources.find(
    resource => resource.formAlias === match.params.formAlias
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (resource) {
      dispatch(fetchFields(resource.organizationId, resource.id));
      dispatch(fetchRecordFields(resource.organizationId, resource.id));
    }
  }, [resource, dispatch]);

  return resource ? (
    <>
      <FieldsContainer
        match={match}
        organizationId={resource.organizationId}
        resource={resource}
        fields={fields.filter(f => f.formId === resource.id)}
        location={location}
      />
      <RecordsContainer match={match} resource={resource} />
    </>
  ) : null;
};
export default React.memo(Resource);
