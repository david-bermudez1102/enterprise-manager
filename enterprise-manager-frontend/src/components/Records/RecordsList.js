import React, { useEffect, useState, useRef, useCallback } from "react";
import Record from "./Record";
import cuid from "cuid";
import RecordsHeader from "./RecordsHeader";
import { useSelector, useDispatch } from "react-redux";
import Pagination from "../Pagination";
import { chunk } from "lodash";
import { useLocation, useHistory, useRouteMatch } from "react-router-dom";
import { handleSortByF } from "./RecordsSort/handleSortBy";
import { sortBy } from "./RecordsSort/sortBy";

const RecordsList = ({
  sortedRecords,
  records,
  recordFields,
  values,
  resource
}) => {
  const location = useLocation();
  const history = useHistory();
  const match = useRouteMatch();
  const dispatch = useDispatch();
  const queryParams = new URLSearchParams(location.search);
  const { pagination, recordsSortedBy } = useSelector(state => state);

  const page =
    parseInt(queryParams.get("page")) >
      Math.ceil(resource.recordsCount / pagination.limit) ||
    !queryParams.get("page")
      ? 1
      : parseInt(queryParams.get("page"));

  const allRecordsRef = useRef();
  useEffect(() => {
    allRecordsRef.current.scrollIntoView();
  }, [page]);

  useEffect(() => {
    if (sortedRecords.length < records.length)
      sortBy(0, records, values, false, resource, dispatch);
  }, [sortedRecords, records.length]);

  const [paginationLimit, setPaginationLimit] = useState(pagination.limit);

  const [chunkOfRecords, setChunkOfRecords] = useState(
    chunk(sortedRecords, paginationLimit)
  );

  useEffect(() => {
    setChunkOfRecords(chunk(sortedRecords, paginationLimit));
  }, [sortedRecords, paginationLimit]);

  useEffect(() => {
    if (pagination.limit !== paginationLimit) {
      const currentValue = chunkOfRecords[page - 1][0];
      const newChunk = chunk(sortedRecords, pagination.limit);
      setPaginationLimit(pagination.limit);
      history.replace(
        `${location.pathname}?page=${newChunk.findIndex(e =>
          e.includes(currentValue)
        ) + 1}`
      );
    }
  }, [
    pagination.limit,
    paginationLimit,
    chunkOfRecords,
    history,
    page,
    location.pathname,
    sortedRecords
  ]);

  const handleSortBy = useCallback((recordFieldId, orders) => {
    handleSortByF(recordFieldId, orders, resource, records, values, dispatch);
  }, []);

  return (
    <div ref={allRecordsRef} className="table-responsive">
      <Pagination resource={resource} page={page} />
      <table className="table table-sm mb-0 table-hover border-0">
        <RecordsHeader
          {...{
            sortedRecords,
            records,
            recordFields,
            values,
            resource,
            match,
            recordsSortedBy,
            handleSortBy
          }}
        />
        <tbody>
          {chunkOfRecords[page - 1]
            ? chunkOfRecords[page - 1].map(record =>
                record.formId === resource.id ? (
                  <Record
                    key={cuid()}
                    record={record}
                    recordFields={recordFields}
                    resourceId={resource.id}
                    values={values}
                  />
                ) : null
              )
            : null}
        </tbody>
      </table>
    </div>
  );
};

export default RecordsList;
