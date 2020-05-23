import React from "react"
import useRecords from "../../containers/Records/Hooks/useRecords"
import RecordsOptions from "./RecordsOptions"
import RecordsList from "./RecordsList"
import { Empty, Col, Card } from "antd"

const Records = props => {
  const { resource } = props
  const {
    loadingInitialData,
    recordFields,
    records,
    sortedRecords,
    values
  } = useRecords(props)
  return (
    <Col span={24} order={24}>
      <Card>
        <RecordsOptions resource={resource} />
        {records.length > 0 ? (
          <RecordsList
            recordFields={recordFields[resource.id] || []}
            resource={resource}
            records={records}
            sortedRecords={sortedRecords[resource.id] || []}
            values={values}
            deleted={props.deleted}
            loadingInitialData={loadingInitialData}
          />
        ) : (
          <Empty description={"This resource doesn't have any records yet."} />
        )}
      </Card>
    </Col>
  )
}

export default React.memo(Records)
