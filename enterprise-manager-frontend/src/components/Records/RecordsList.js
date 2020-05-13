import React, { useEffect, useRef } from "react";
import { useFilterRecords } from "./hooks/useFilterRecords";
import { useChangePage } from "./hooks/useChangePage";
import recordsSort from "./RecordsSort";
import FilterOptions from "./RecordsFilter/FilterOptions/";
import { Table, Pagination, Row, Col } from "antd";
import { useRecordsList } from "./hooks/useRecordsList";

const RecordsList = props => {
  const { sortedRecords, records, recordFields, values, resource } = props;
  const { filteredRecords, filterRecords } = useFilterRecords({
    sortedRecords,
    values,
  });
  const {
    match,
    dispatch,
    history,
    location,
    chunkOfRecords,
    page,
    paginationLimit,
  } = useChangePage({ ...props, filteredRecords });

  const { components, columns, rowSelection } = useRecordsList({
    recordFields,
    values,
    resource,
  });

  const handleSortBy = (recordFieldId, order) => {
    recordsSort(recordFieldId, order, resource, values, dispatch);
  };

  const allRecordsRef = useRef();

  useEffect(() => {
    allRecordsRef.current.scrollIntoView();
  }, [page, match]);

  const onShowSizeChange = (current, pageSize) => {
    dispatch({
      type: "SET_LIMIT",
      limit: pageSize,
    });
  };

  const setPage = page => {
    history.push(`${location.pathname}?page=${page}`);
  };

  return (
    <div ref={allRecordsRef} style={{ maxWidth: "100%" }}>
      <Row style={{ height: "80px" }}>
        <FilterOptions />
        <Col span="auto">
          <Pagination
            {...{
              key: "pagination",
              position: ["topRight"],
              current: page,
              pageSizeOptions: ["5", "10", "25", "50", "100"],
              showSizeChanger: true,
              showQuickJumper: true,
              size: "small",
              pageSize: paginationLimit,
              onShowSizeChange: onShowSizeChange,
              onChange: setPage,
              total: values.length,
              showTotal: (total, range) =>
                `${range[0]}-${range[1]} of ${total} items`,
            }}
          />
        </Col>
      </Row>

      <Table
        components={components}
        rowSelection={rowSelection}
        columns={columns}
        dataSource={chunkOfRecords[page - 1]}
        pagination={false}
        onChange={(pagination, filter, sorter) =>
          sorter.column
            ? handleSortBy(sorter.column.dataIndex, sorter.order)
            : handleSortBy(0)
        }
      />
    </div>
  );
};

export default React.memo(RecordsList);
