import React, { useState, useEffect, useRef } from "react"
import { useChangePage } from "./hooks/useChangePage"
import recordsSort from "./RecordsSort"
import FilterOptions from "./RecordsFilter/FilterOptions/"
import { Table, Pagination, Row, Col, Empty, Card } from "antd"
import useRecordsList from "./hooks/useRecordsList"
import { useFilterRecords } from "./hooks/useFilterRecords"
import { fetchRecords } from "../../actions/recordActions"
import { useDispatch, useSelector, shallowEqual } from "react-redux"
import useFilters from "../Filters/Hooks/useFilters"
import RecordOptions from "./RecordOptions"
import DeletionModal from "../Modal/DeletionModal"
import RecordPreview from "./RecordPreview"
import useModal from "../Modal/Hooks/useModal"
import { plural } from "pluralize"
import Text from "antd/lib/typography/Text"
import BulkActions from "./BulkActions"
import "./recordsListStyles.scss"
import { ReactHeight } from "react-height"

const RecordsList = props => {
  const dispatch = useDispatch()
  const { showModal, ...deletionModal } = useModal()
  const [record, setRecord] = useState()
  const [currentFilteredBy, setCurrentFilteredBy] = useState()
  const mounted = useRef()
  const [sorting, setSorting] = useState(false)
  const [listHeight, setListHeight] = useState()
  const { recordsStatus } = useSelector(
    ({ recordsStatus }) => ({ recordsStatus }),
    shallowEqual
  )

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

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true
    } else {
      if (filtersApplied.length === 0) setCurrentFilteredBy("for current month")
    }
  }, [filtersApplied])

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
    filteredRecords,
    sorting
  })

  const {
    components,
    columns,
    rowSelection,
    totalSelected,
    selectedRows
  } = useRecordsList({
    recordFields,
    values: filteredRecords || sortedRecords,
    resource
  })

  const handleSortBy = (recordFieldId, order, fieldType) => {
    recordsSort(
      fieldType,
      recordFieldId,
      order,
      resource,
      filteredData || values,
      dispatch,
      props.deleted
    ).then(() => setSorting(false))
  }
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

  return (
    <>
      <div>
        <Row gutter={[16, 1]}>
          <FilterOptions
            {...filters}
            filtersApplied={filtersApplied}
            resource={resource}
            setCurrentFilteredBy={setCurrentFilteredBy}
          />
        </Row>
        <Row>
          <Col
            span={24}
            style={{
              height: listHeight,
              position: "relative"
            }}>
            <Card
              bordered={false}
              style={{ width: "100%", position: "absolute" }}
              bodyStyle={{ paddingBottom: 0 }}>
              <ReactHeight onHeightReady={setListHeight}>
                <Row justify={"space-between"}>
                  <Col span={"auto"}>
                    <BulkActions
                      resource={resource}
                      values={sortedRecords}
                      selectedRows={selectedRows}
                      recordFields={recordFields}
                      totalSelected={totalSelected}
                    />
                  </Col>
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
                <Row>
                  <Col span={24} className={"custom-table"}>
                    <Table
                      scroll={{
                        scrollToFirstRowOnChange: false,
                        x: "auto"
                      }}
                      tableLayout={"auto"}
                      loading={
                        loadingInitialData || loadingData || loadingFilteredData
                      }
                      components={components}
                      rowSelection={rowSelection}
                      columns={[
                        {
                          title: "Actions",
                          dataIndex: "actions",
                          width: "150px",
                          key: "x",
                          render: (text, record) => (
                            <RecordOptions
                              resource={resource}
                              record={record}
                              showModal={showModal}
                              setRecord={setRecord}
                            />
                          )
                        },
                        {
                          key: `listing_id_${resource.id}`,
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
                        if (sorter.column) {
                          setSorting(true)
                          handleSortBy(
                            sorter.column.dataIndex,
                            sorter.order,
                            sorter.column.dataType
                          )
                        } else handleSortBy("listingId")
                      }}
                      locale={{
                        filterConfirm: "Ok",
                        filterReset: "Reset",
                        emptyText: (
                          <Empty
                            description={
                              <>
                                There are no records for the current period of
                                time.
                              </>
                            }
                            image={Empty.PRESENTED_IMAGE_SIMPLE}
                          />
                        )
                      }}
                    />
                  </Col>
                </Row>
              </ReactHeight>
            </Card>
          </Col>
        </Row>
      </div>
      {recordsStatus.isSaving && (
        <div style={{ position: "fixed", top: 0, zIndex: 5000 }}>
          Saving Changes...
        </div>
      )}
      <DeletionModal {...deletionModal} />
      {/* <ConnectionSettings
        connectionName={"ZohoBooks"}
        recordFields={recordFields}
        resource={resource}
      />*/}
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
