import React, { useState, useEffect } from "react"
import capitalize from "capitalize"
import ResizeableTitle from "../ResizableTitle"
import RecordCell from "../RecordCell"
import { useDispatch } from "react-redux"
import { SearchOutlined } from "@ant-design/icons"
import ColumnSearch from "../ColumnSearch"

const useRecordsList = ({ recordFields, values, resource }) => {
  const getColumnSearchProps = dataIndex => ({
    filterDropdown: props => {
      return <ColumnSearch {...props} dataIndex={dataIndex} values={values} />
    },
    filterIcon: filtered => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    )
  })

  const getColumns = recordFields =>
    recordFields.map((field, index) => ({
      key: field.id,
      ...getColumnSearchProps(field.id),
      title: capitalize(field.name),
      dataIndex: field.id,
      sorter: true,
      wordWrap: "break",
      width: index < recordFields.length - 1 ? 200 : undefined,
      ellipsis: true,
      editable: true,
      onCell: record => ({
        record,
        dataIndex: field.id,
        fieldType: field.fieldType,
        organizationId: resource.organizationId
      })
    }))

  const [state, setState] = useState({
    columns: getColumns(recordFields)
  })

  const [totalSelected, setTotalSelected] = useState("")
  const dispatch = useDispatch()

  useEffect(() => {
    setState({ columns: getColumns(recordFields) })
  }, [recordFields, values, resource])

  const handleResize = index => (e, { size }) => {
    const nextColumns = [...state.columns]
    nextColumns[index] = {
      ...nextColumns[index],
      width: size.width
    }
    setState({ columns: nextColumns })
  }

  const moveColumn = (dragIndex, hoverIndex) => {
    const { columns } = state
    const dragColumn = columns[dragIndex]
    const dragRecordField = recordFields[dragIndex]
    const tmpRecordFields = [...recordFields]
    const tmpColumns = [...columns]
    tmpRecordFields.splice(dragIndex, 1)
    tmpRecordFields.splice(hoverIndex, 0, dragRecordField)
    tmpColumns.splice(dragIndex, 1)
    tmpColumns.splice(hoverIndex, 0, dragColumn)
    setState({ columns: tmpColumns })
    dispatch({ type: "SORT_RECORD_FIELDS", recordFields: tmpRecordFields })
  }

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      if (selectedRows.length === 1) setTotalSelected(`1 record selected.`)
      else if (selectedRows.length > 1)
        setTotalSelected(`${selectedRows.length} records selected.`)
      else setTotalSelected("")
    }
  }

  const components = {
    header: {
      cell: ResizeableTitle
    },
    body: {
      cell: RecordCell
    }
  }

  const columns = state.columns.map((col, index) => ({
    ...col,
    onHeaderCell: column => ({
      width: column.width,
      onResize: handleResize(index),
      moveColumn,
      index
    })
  }))

  return {
    components,
    columns,
    rowSelection,
    totalSelected
  }
}

export default useRecordsList
