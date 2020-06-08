import React from "react"
import { Dropdown, Button } from "antd"
import RecordsActions from "./RecordsActions"
import { DownOutlined } from "@ant-design/icons"

const BulkActions = props => {
  return (
    <Dropdown
      overlay={<RecordsActions {...props} />}
      overlayClassName={"shadow-sm"}>
      <Button type={props.selectedRows.length > 0 ? "primary" : undefined}>
        {props.selectedRows.length > 0 ? props.totalSelected : "Actions"}{" "}
        <DownOutlined />
      </Button>
    </Dropdown>
  )
}

export default BulkActions
