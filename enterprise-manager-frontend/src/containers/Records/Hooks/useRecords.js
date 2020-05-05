import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { useState, useEffect } from "react";
import { fetchRecords } from "../../../actions/recordActions";
import { useRouteMatch } from "react-router-dom";

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
  const dispatch = useDispatch();

  const [listHeight, setListHeight] = useState(0);
  const [optionsHeight, setOptionsHeight] = useState(0);

  useEffect(() => {
    /* const lastRecord = Math.max(
      ...records.filter(record => record.formId === resource.id).map(r => r.id),
      0
    ); // return the most recent record */
    if (resource) dispatch(fetchRecords(resource.organizationId, resource.id));
  }, [dispatch, resource]);

  return {
    resource,
    match,
    recordFields,
    records,
    sortedRecords,
    values,
    listHeight,
    setListHeight,
    optionsHeight,
    setOptionsHeight,
    dispatch,
  };
};

export default useRecords;
