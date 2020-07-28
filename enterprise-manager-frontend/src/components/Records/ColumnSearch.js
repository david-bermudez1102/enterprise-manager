import React, { useState } from "react"
import { Select, Space, Button } from "antd"
import { SearchOutlined } from "@ant-design/icons"
import workerInstance from "../../workers/workerActions"

const ColumnSearch = ({
  setSelectedKeys,
  confirm,
  clearFilters,
  dataIndex,
  values,
  recordFields
}) => {
  const [list, setList] = useState([])
  const currentColumn = recordFields.find(rF => rF.id === dataIndex)

  return (
    <div
      style={{
        padding: 8,
        display: "flex",
        flexWrap: "wrap",
        maxWidth: 200
      }}>
      <Select
        mode='multiple'
        options={list}
        onSearch={async () => {
          const data = await workerInstance.filters(values, dataIndex)
          setList(data)
        }}
        placeholder={`Search ${currentColumn.name}`}
        onChange={value => {
          setList([])
          setSelectedKeys(value ? value : [])
        }}
        notFoundContent={null}
        style={{ width: "100%", marginBottom: 8 }}
      />

      <Space>
        <Button
          type='primary'
          onClick={confirm}
          icon={<SearchOutlined />}
          size='small'
          style={{ width: 90 }}>
          Search
        </Button>
        <Button onClick={clearFilters} size='small' style={{ width: 90 }}>
          Reset
        </Button>
      </Space>
    </div>
  )
}

export default React.memo(ColumnSearch)
