import React, { useEffect, useRef } from "react";
import Record from "./Record";
import RecordsHeader from "./RecordsHeader";
import Pagination from "../Pagination";
import { useSelectRecords } from "./hooks/useSelectRecords";
import RecordsFilter from "./RecordsFilter";
import { useFilterRecords } from "./hooks/useFilterRecords";
import { useChangePage } from "./hooks/useChangePage";
import recordsSort from "./RecordsSort";

const RecordsList = (props) => {
  const { sortedRecords, records, recordFields, values, resource } = props;
  const { filteredRecords, filterRecords } = useFilterRecords({
    sortedRecords,
    values,
  });
  const {
    chunkOfRecords,
    recordsSortedBy,
    page,
    match,
    dispatch,
  } = useChangePage({ ...props, filteredRecords });

  const allRecordsRef = useRef();

  const {
    selectRecord,
    selectAllRecords,
    checked,
    allChecked,
  } = useSelectRecords({ sortedRecords, filteredRecords });

  const handleSortBy = (recordFieldId, orders) => {
    recordsSort(recordFieldId, orders, resource, records, values, dispatch);
  };

  useEffect(() => {
    allRecordsRef.current.scrollIntoView();
  }, [page, match]);

  return (
    <div ref={allRecordsRef} className="table-responsive">
      <Pagination resource={resource} page={page} />
      <table className="table mb-0 table-hover border-0">
        <RecordsHeader
          {...{
            ...props,
            filteredRecords,
            match,
            recordsSortedBy,
            handleSortBy,
            selectAllRecords,
            allChecked,
          }}
        />
        <tbody>
          <RecordsFilter {...props} filterRecords={filterRecords} />
          {chunkOfRecords[page - 1]
            ? chunkOfRecords[page - 1].map((record, id) =>
                record.formId === resource.id ? (
                  <Record
                    key={`record_key_${id}`}
                    record={record}
                    checked={checked.find((r) => r === record.id) || false}
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

export default React.memo(RecordsList);
