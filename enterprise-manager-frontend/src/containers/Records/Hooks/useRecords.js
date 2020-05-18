import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchRecords } from "../../../actions/recordActions";
import { useRouteMatch } from "react-router-dom";

const useRecords = props => {
  const { resource, deleted } = props;
  const match = useRouteMatch();
  const dispatch = useDispatch();
  const {
    recordFields,
    records,
    archivedRecords,
    archivedValues,
    sortedRecords,
    sortedArchivedRecords,
    values,
  } = useSelector(
    ({
      recordFields,
      records,
      archivedRecords,
      archivedValues,
      sortedRecords,
      sortedArchivedRecords,
      values,
    }) => ({
      recordFields,
      records,
      archivedRecords,
      archivedValues,
      sortedRecords,
      sortedArchivedRecords,
      values,
    }),
    shallowEqual
  );
  useEffect(() => {
    /* const lastRecord = Math.max(
      ...records.filter(record => record.formId === resource.id).map(r => r.id),
      0
    ); // return the most recent record */
    if (resource)
      dispatch(fetchRecords(resource.organizationId, resource.id, deleted));
  }, [dispatch, resource, deleted]);

  return {
    resource,
    match,
    recordFields,
    records: deleted
      ? archivedRecords[resource.id] || []
      : records[resource.id] || [],
    sortedRecords: deleted ? sortedArchivedRecords : sortedRecords,
    values: deleted ? archivedValues : values,
    dispatch,
  };
};

export default useRecords;
