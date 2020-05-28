import React, { useState, useEffect, useRef } from "react"
import { useChangePage } from "./hooks/useChangePage"
import recordsSort from "./RecordsSort"
import FilterOptions from "./RecordsFilter/FilterOptions/"
import { Table, Pagination, Row, Col, Empty, Divider } from "antd"
import useRecordsList from "./hooks/useRecordsList"
import { DndProvider } from "react-dnd"
import HTML5Backend from "react-dnd-html5-backend"
import { useFilterRecords } from "./hooks/useFilterRecords"
import { fetchRecords } from "../../actions/recordActions"
import { useDispatch } from "react-redux"
import useFilters from "../Filters/Hooks/useFilters"
import RecordOptions from "./RecordOptions"
import DeletionModal from "../Modal/DeletionModal"
import RecordPreview from "./RecordPreview"
import useModal from "../Modal/Hooks/useModal"
import { plural } from "pluralize"
import Text from "antd/lib/typography/Text"

const RecordsList = props => {
  const dispatch = useDispatch()
  const { showModal, ...deletionModal } = useModal()
  const [record, setRecord] = useState()
  const [currentFilteredBy, setCurrentFilteredBy] = useState()
  const mounted = useRef()

  const {
    loadingInitialData,
    sortedRecords,
    recordFields,
    values,
    resource
  } = props
  const { filteredRecords, filterRecords } = useFilterRecords({
    records: sortedRecords
  })

  const {
    loadingFilteredData,
    filteredData,
    filtersApplied,
    setFiltersApplied,
    ...filters
  } = useFilters({
    action: queryParams =>
      dispatch(
        fetchRecords(
          resource.organizationId,
          resource.id,
          props.deleted,
          true,
          queryParams
        )
      )
  })

  const {
    location,
    history,
    chunkOfRecords,
    page,
    paginationLimit,
    loadingData
  } = useChangePage({
    ...props,
    filteredData,
    filteredRecords
  })

  const { components, columns, rowSelection, totalSelected } = useRecordsList({
    recordFields,
    values: filteredRecords || sortedRecords,
    resource
  })

  const handleSortBy = (recordFieldId, order) =>
    recordsSort(
      recordFieldId,
      order,
      resource,
      filteredData || values,
      dispatch,
      props.deleted
    )

  const onShowSizeChange = (current, pageSize) => {
    dispatch({
      type: "SET_LIMIT",
      limit: pageSize
    })
  }

  const setPage = page => {
    const queryParams = new URLSearchParams(location.search)
    if (queryParams.has("page")) queryParams.delete("page")
    history.push({
      path: location.pathname,
      search: `page=${page}&${queryParams.toString()}`
    })
  }

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true
    } else {
      if (filtersApplied.length === 0) setCurrentFilteredBy("for current month")
    }
  }, [filtersApplied])

  return (
    <>
      <div style={{ maxWidth: "100%" }}>
        <Row gutter={[16, 1]}>
          <FilterOptions
            {...filters}
            filtersApplied={filtersApplied}
            resource={resource}
            setCurrentFilteredBy={setCurrentFilteredBy}
          />
        </Row>
        <Divider />
        <Row gutter={[16, 16]} justify={"space-between"}>
          <Col>{totalSelected}</Col>
          <Col span={"auto"}>
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
                total: filteredRecords
                  ? filteredRecords.length
                  : sortedRecords.length,
                showTotal: (total, range) =>
                  `${range[0]}-${range[1]} of ${total} items`
              }}
            />
            <Text type={"secondary"} style={{ float: "right" }}>
              Showing {plural(resource.name)} {currentFilteredBy}
            </Text>
          </Col>
        </Row>
        <DndProvider backend={HTML5Backend}>
          <Table
            style={{ overflowX: "auto" }}
            loading={loadingInitialData || loadingData || loadingFilteredData}
            components={components}
            rowSelection={rowSelection}
            columns={[
              {
                title: "Actions",
                dataIndex: "",
                width: "150px",
                key: "x",
                render: (text, record) => (
                  <RecordOptions
                    record={record}
                    showModal={showModal}
                    setRecord={setRecord}
                  />
                )
              },
              {
                key: `record_field_head_listing_id_${resource.id}`,
                title: "#",
                dataIndex: "listingId",
                sorter: true,
                width: "100px"
              },
              ...columns
            ]}
            dataSource={chunkOfRecords[page - 1]}
            pagination={false}
            onChange={(pagination, filters, sorter) => {
              filterRecords(filters)
              sorter.column
                ? handleSortBy(sorter.column.dataIndex, sorter.order)
                : handleSortBy("listingId")
            }}
            locale={{
              filterConfirm: "Ok",
              filterReset: "Reset",
              emptyText: (
                <Empty
                  description={
                    "There are no records with the selected filters. Please try again"
                  }
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                />
              )
            }}
          />
        </DndProvider>
      </div>
      <DeletionModal {...deletionModal} />
      <RecordPreview
        resource={resource}
        record={record}
        recordFields={recordFields}
        setRecord={setRecord}
      />
    </>
  )
}

export default React.memo(RecordsList)
