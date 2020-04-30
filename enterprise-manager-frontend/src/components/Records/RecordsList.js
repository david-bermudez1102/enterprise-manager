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
import { useSelectRecords } from "./hooks/useSelectRecords";
import RecordsFilter from "./RecordsFilter";

const RecordsList = props => {
  const { sortedRecords, records, recordFields, values, resource } = props;
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
    if (sortedRecords.length < records.length)
      sortBy(0, records, values, false, resource, dispatch);
  }, [dispatch, records, values, resource, sortedRecords]);

  const [paginationLimit, setPaginationLimit] = useState(pagination.limit);
  const {
    selectRecord,
    selectAllRecords,
    checked,
    allChecked
  } = useSelectRecords({ sortedRecords });

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
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    allRecordsRef.current.scrollIntoView();
  }, [page]);

  return (
    <div ref={allRecordsRef} className="table-responsive">
      <Pagination resource={resource} page={page} />
      <table className="table mb-0 table-hover border-0">
        <RecordsHeader
          {...{
            ...props,
            match,
            recordsSortedBy,
            handleSortBy,
            selectAllRecords,
            allChecked
          }}
        />
        <tbody>
          <RecordsFilter {...props} />
          {chunkOfRecords[page - 1]
            ? chunkOfRecords[page - 1].map(record =>
                record.formId === resource.id ? (
                  <Record
                    key={cuid()}
                    record={record}
                    checked={checked.find(r => r === record.id)}
                    selectRecord={selectRecord}
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
