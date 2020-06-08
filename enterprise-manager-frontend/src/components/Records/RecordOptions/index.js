import React from "react"
import { removeRecord } from "../../../actions/recordActions"
import { Button, Tooltip } from "antd"
import { ExpandOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons"
import { Link } from "react-router-dom"
import { useSelector, shallowEqual } from "react-redux"
import zohoBooksIcon from "../../../containers/ZohoBooks/favicon.ico"
import { singular } from "pluralize"
import Text from "antd/lib/typography/Text"

const RecordOptions = ({ resource, record, showModal, setRecord }) => {
  const { session } = useSelector(({ session }) => ({ session }), shallowEqual)

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "space-between"
      }}>
      <Button
        type={"ghost"}
        style={{ padding: 0, border: 0 }}
        onClick={() => setRecord(record)}>
        <ExpandOutlined />
      </Button>
      <Link to={"edit"}>
        <Button type={"ghost"} style={{ padding: 0, border: 0 }}>
          <Text type={"warning"}>
            <EditOutlined />
          </Text>
        </Button>
      </Link>
      <Button
        type='danger'
        ghost
        style={{ padding: 0, border: 0 }}
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
      <Button type={"ghost"} style={{ padding: 0, border: 0 }}>
        <Tooltip
          color={record.zohoRecordId ? undefined : "red"}
          placement='top'
          title={
            <div style={{ textAlign: "center", width: "100%" }}>
              {record.zohoRecordId ? (
                <>ZohoBooks ID: {record.zohoRecordId}</>
              ) : (
                <>
                  This {singular(resource.name)} hasn't been sent to ZohoBooks
                  yet.
                </>
              )}
            </div>
          }>
          <img
            alt={""}
            src={zohoBooksIcon}
            width={14}
            style={{
              filter: record.zohoRecordId ? undefined : "grayscale(100%)",
              verticalAlign: undefined,
              padding: 0,
              marginTop: -3
            }}
          />
        </Tooltip>
      </Button>
    </div>
  )
}
export default React.memo(RecordOptions)
