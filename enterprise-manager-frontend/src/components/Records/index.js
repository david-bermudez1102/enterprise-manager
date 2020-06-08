import React from "react"
import useRecords from "../../containers/Records/Hooks/useRecords"
import RecordsList from "./RecordsList"
import { Col } from "antd"

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
      <RecordsList
        recordFields={recordFields[resource.id] || []}
        resource={resource}
        records={records}
        sortedRecords={sortedRecords[resource.id] || []}
        values={values}
        deleted={props.deleted}
        loadingInitialData={loadingInitialData}
      />
    </Col>
  )
}

export default React.memo(Records)
