import React, { useEffect, useRef, useState } from "react";
import { useChangePage } from "./hooks/useChangePage";
import recordsSort from "./RecordsSort";
import FilterOptions from "./RecordsFilter/FilterOptions/";
import { Table, Pagination, Row, Col } from "antd";
import { useRecordsList } from "./hooks/useRecordsList";
import { DndProvider } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import { useFilterRecords } from "./hooks/useFilterRecords";

const RecordsList = props => {
  const { sortedRecords, recordFields, values, resource } = props;
  const { filteredRecords, filterRecords } = useFilterRecords({
    sortedRecords,
  });

  const { components, columns, rowSelection, totalSelected } = useRecordsList({
    recordFields,
    values,
    resource,
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

  const [loading, setLoading] = useState(false);
  const handleSortBy = async (recordFieldId, order) => {
    setLoading(true);
    await recordsSort(recordFieldId, order, resource, values, dispatch);
    setLoading(false);
  };

  const allRecordsRef = useRef();

  useEffect(() => {
    allRecordsRef.current.scrollIntoView();
    // eslint-disable-next-line
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
    <div ref={allRecordsRef} style={{ maxWidth: "100%", overflowX: "auto" }}>
      <Row style={{ height: "70px" }}>
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
              total: filteredRecords ? filteredRecords.length : values.length,
              showTotal: (total, range) =>
                `${range[0]}-${range[1]} of ${total} items`,
            }}
          />
        </Col>
      </Row>
      <Row>
        <Col>{totalSelected}</Col>
      </Row>
      <DndProvider backend={HTML5Backend}>
        <Table
          tableLayout={"auto"}
          loading={loading}
          components={components}
          rowSelection={rowSelection}
          columns={[
            {
              key: `record_field_head_listing_id${resource.id}`,
              title: "#",
              dataIndex: "listingId",
              sorter: true,
            },
            ...columns,
          ]}
          dataSource={chunkOfRecords[page - 1]}
          pagination={false}
          onChange={(pagination, filters, sorter) => {
            filterRecords(filters);
            sorter.column
              ? handleSortBy(sorter.column.dataIndex, sorter.order)
              : handleSortBy(0);
          }}
        />
      </DndProvider>
    </div>
  );
};

export default RecordsList;
