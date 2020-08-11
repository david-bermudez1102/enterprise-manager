import React, { useState, useEffect } from "react"
import { Descriptions, Timeline } from "antd"
import { getOne } from "../../../actions/fetchActions"
import { useSelector, shallowEqual } from "react-redux"
import jsyaml from "js-yaml"
import { ClockCircleOutlined } from "@ant-design/icons"
import { format } from "date-fns"

const events = { update: "changed", create: "created" }

const RecordHistory = ({ record }) => {
  const [versions, setVersions] = useState(record.versions || [])
  const { accounts, fields } = useSelector(
    ({ accounts, fields }) => ({ accounts, fields }),
    shallowEqual
  )

  useEffect(() => {
    getOne(
      `/api/v1/organizations/${record.organizationId}/forms/${record.formId}/records/${record.id}`,
      record => setVersions(record.links.versions)
    )
  }, [record])

  console.log(versions)

  return (
    <>
      History:
      <Timeline pending={true}>
        {versions.map(version => {
          const { record_field_id } = jsyaml.load(version.object)
          const { content } = jsyaml.load(version.object_changes)
          const field = fields[record.formId].find(
            f => f.recordFieldId === record_field_id
          )
          return (
            <Timeline.Item
              style={{ minHeight: 80 }}
              key={`record_version_${version.id}`}
              dot={<ClockCircleOutlined className='timeline-clock-icon' />}>
              <small style={{ float: "right" }}>
                <cite>{format(new Date(version.created_at), "PPPpp")}</cite>
              </small>
              <br />
              {
                accounts.find(
                  account => account.id === parseInt(version.whodunnit)
                ).name
              }{" "}
              {events[version.event]} <strong>{field.name}</strong> from{" "}
              {content[0]} to {content[1]}.
            </Timeline.Item>
          )
        })}
      </Timeline>
    </>
  )
}

export default RecordHistory
