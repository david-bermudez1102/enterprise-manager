import React from "react"
import { Button } from "antd"
import WithModal from "../WithModal"
import { plural } from "pluralize"
import { zohoApi } from "../../../../actions/zohoBooksActions"
import { prepareRecords } from "../../../../containers/ZohoBooks/prepareData"

const UpdateAllModal = props => {
  const {
    handleOk,
    modalProps,
    resource,
    connectionType,
    values,
    selectedRows,
    recordFields,
    ...useModalProps
  } = props

  const onOk = () =>
    zohoApi(
      {
        formId: resource.id,
        organizationId: resource.organizationId
      },
      connectionType,
      "update_all",
      prepareRecords(
        selectedRows.length > 0 ? selectedRows : values,
        recordFields
      )
    )

  return (
    <WithModal
      {...useModalProps}
      modalProps={{
        ...modalProps,
        title: <>Update {plural(props.connectionType)} in ZohoBooks?</>
      }}
      footer={[
        <Button key='cancel_sync_modal' onClick={props.handleCancel}>
          Cancel
        </Button>,
        <Button
          key='merge_sync_modal'
          type='primary'
          onClick={() => handleOk(onOk(true))}>
          Yes, update
        </Button>
      ]}
    />
  )
}

export default UpdateAllModal
