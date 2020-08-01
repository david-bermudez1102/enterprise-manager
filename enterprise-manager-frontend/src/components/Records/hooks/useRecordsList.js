import React, { useState, useEffect, useCallback } from "react"
import capitalize from "capitalize"
import ResizeableTitle from "../ResizableTitle"
import RecordCell from "../RecordCell"
import { useDispatch } from "react-redux"
import { SearchOutlined } from "@ant-design/icons"
import ColumnSearch from "../ColumnSearch"
import { singular, plural } from "pluralize"
import RecordRow from "../RecordRow"

const useRecordsList = ({ recordFields, values, resource }) => {
  const getColumnSearchProps = useCallback(
    dataIndex => ({
      filterDropdown: props => (
        <ColumnSearch
          {...props}
          dataIndex={dataIndex}
          values={values}
          recordFields={recordFields}
        />
      ),
      filterIcon: filtered => (
        <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
      )
    }),
    [values, recordFields]
  )

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
    console.log(tmpRecordFields)
    setState({ columns: tmpColumns })
    dispatch({
      type: "SORT_RECORD_FIELDS",
      recordFields: tmpRecordFields,
      formId: resource.id
    })
  }

  const getColumns = useCallback(
    recordFields =>
      recordFields.map((field, index) => ({
        key: field.id,
        ...getColumnSearchProps(field.id),
        title: capitalize(field.name),
        dataIndex: field.id,
        dataType: field.fieldType,
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
        }),
        onHeaderCell: column => ({
          width: column.width,
          onResize: handleResize(index),
          moveColumn,
          index
        })
      })),
    [getColumnSearchProps, resource.organizationId]
  )

  const [state, setState] = useState({
    columns: getColumns(recordFields)
  })

  const [totalSelected, setTotalSelected] = useState("")
  const dispatch = useDispatch()

  useEffect(() => {
    setState({ columns: getColumns(recordFields) })
  }, [getColumns, recordFields])

  const [selectedRows, setSelectedRows] = useState([])

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedRows(selectedRows)
      if (selectedRows.length === 1)
        setTotalSelected(`1 ${singular(resource.name)} selected`)
      else if (selectedRows.length > 1)
        setTotalSelected(
          `${selectedRows.length} ${plural(resource.name)} selected`
        )
      else setTotalSelected("")
    }
  }

  const components = {
    header: {
      cell: ResizeableTitle
    },
    body: {
      row: RecordRow,
      cell: RecordCell
    }
  }

  return {
    components,
    columns: state.columns,
    rowSelection,
    totalSelected,
    selectedRows
  }
}

export default useRecordsList
