import React from "react"
import { removeRecord } from "../../../actions/recordActions"
import { Button } from "antd"
import { ExpandOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons"
import { Link } from "react-router-dom"
import { useSelector, shallowEqual } from "react-redux"

const RecordOptions = ({ record, showModal, setRecord }) => {
  const { session } = useSelector(({ session }) => ({ session }), shallowEqual)

  return (
    <>
      <Button
        type='link'
        style={{ padding: 0 }}
        onClick={() => setRecord(record)}>
        <ExpandOutlined />
      </Button>
      <Link to={"edit"}>
        <Button type='link' style={{ padding: 0 }}>
          <EditOutlined />
        </Button>
      </Link>
      <Button
        type='link'
        style={{ padding: 0 }}
        onClick={() =>
          showModal({
            title: `Delete the selected record?`,
            text: "All of the associated content will be deleted!",
            action: removeRecord(
              session.currentUser.organizationId,
              record.formId,
              record.id
            )
          })
        }>
        <DeleteOutlined />
      </Button>
    </>
  )
}
export default React.memo(RecordOptions)
