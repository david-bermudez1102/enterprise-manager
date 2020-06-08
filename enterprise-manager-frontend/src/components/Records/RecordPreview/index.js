import React, { useState, useEffect } from "react"
import { Drawer, Descriptions } from "antd"
import { format, formatDistanceToNow } from "date-fns"
import { singular } from "pluralize"

const RecordPreview = ({ resource, record, recordFields, setRecord }) => {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    if (record) setVisible(true)
  }, [record])

  return record ? (
    <Drawer
      width={500}
      placement='right'
      closable={true}
      visible={visible}
      onClose={() => setVisible(false)}
      afterVisibleChange={visible => (!visible ? setRecord() : null)}>
      <Descriptions title={singular(resource.name)} column={1}>
        <Descriptions.Item label={"Created by"} key={`created_by_${record.id}`}>
          {record.createdBy}
        </Descriptions.Item>
        {recordFields.map(f => (
          <Descriptions.Item label={f.name} key={`description_label_${f.id}`}>
            {record[f.id]}
          </Descriptions.Item>
        ))}
        <Descriptions.Item label={"Created on"} key={`created_at_${record.id}`}>
          {format(new Date(record.createdAt), "PPPPp")} (
          {formatDistanceToNow(new Date(record.createdAt), { addSuffix: true })}
          )
        </Descriptions.Item>
        <Descriptions.Item label={"Updated on"} key={`updated_at_${record.id}`}>
          {format(new Date(record.updatedAt), "PPPPp")} (
          {formatDistanceToNow(new Date(record.updatedAt), { addSuffix: true })}
          )
        </Descriptions.Item>
      </Descriptions>
    </Drawer>
  ) : null
}

export default RecordPreview
