import { useSelector, shallowEqual } from "react-redux";
import { useState, useEffect } from "react";
import { fetchRecords } from "../../../actions/recordActions";
import { useRouteMatch } from "react-router-dom";
import useLoader from "../../../components/Loader/useLoader";

const useRecords = props => {
  const { resource } = props;
  const match = useRouteMatch();
  const { recordFields, records, sortedRecords, values } = useSelector(
    ({ recordFields, records, sortedRecords, values }) => ({
      recordFields,
      records,
      sortedRecords,
      values,
    }),
    shallowEqual
  );
  const { dispatch, loading, dispatchWithLoader } = useLoader();

  const [listHeight, setListHeight] = useState(0);
  const [optionsHeight, setOptionsHeight] = useState(0);

  useEffect(() => {
    /* const lastRecord = Math.max(
      ...records.filter(record => record.formId === resource.id).map(r => r.id),
      0
    ); // return the most recent record */
    if (resource)
      dispatchWithLoader(fetchRecords(resource.organizationId, resource.id));
  }, [dispatchWithLoader, resource]);

  return {
    resource,
    match,
    recordFields,
    records: records.filter(f => f.formId === resource.id),
    sortedRecords,
    values,
    listHeight,
    setListHeight,
    optionsHeight,
    setOptionsHeight,
    dispatch,
    loading,
  };
};

export default useRecords;
