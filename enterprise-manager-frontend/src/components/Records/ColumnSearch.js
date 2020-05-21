import React, { useState } from "react"
import { Select, Space, Button } from "antd"
import { SearchOutlined } from "@ant-design/icons"
import workerInstance from "../../workers/workerActions"

const ColumnSearch = ({
  setSelectedKeys,
  selectedKeys,
  confirm,
  filters,
  clearFilters,
  dataIndex,
  values
}) => {
  const [list, setList] = useState([])

  return (
    <div style={{ padding: 8 }}>
      <Select
        mode='multiple'
        options={list}
        onSearch={async () => {
          const data = await workerInstance.filters(values, dataIndex)
          setList(data)
        }}
        placeholder={`Search ${dataIndex}`}
        onChange={value => {
          setList([])
          setSelectedKeys(value ? value : [])
        }}
        notFoundContent={null}
        style={{ width: 144, marginBottom: 8, display: "block" }}
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
        <Button
          onClick={() => this.handleReset(clearFilters)}
          size='small'
          style={{ width: 90 }}>
          Reset
        </Button>
      </Space>
    </div>
  )
}

export default React.memo(ColumnSearch)
