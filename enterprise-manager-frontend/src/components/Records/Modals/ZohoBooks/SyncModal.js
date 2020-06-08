import React from "react"
import { Button } from "antd"
import WithModal from "../WithModal"
import { plural } from "pluralize"
import { zohoApi } from "../../../../actions/zohoBooksActions"
import { prepareRecords } from "../../../../containers/ZohoBooks/prepareData"

const SyncModal = props => {
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

  const onOk = merge =>
    zohoApi(
      {
        formId: resource.id,
        organizationId: resource.organizationId
      },
      connectionType,
      `sync?merge_records=${merge}`,
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
        title: `Merge ${plural(props.connectionType)}?`
      }}
      footer={[
        <Button key='cancel_sync_modal' onClick={props.handleCancel}>
          Cancel
        </Button>,
        <Button
          key='donotmerge_sync_modal'
          onClick={() => handleOk(onOk(false))}>
          No, only add non-existing {plural(props.connectionType)}
        </Button>,
        <Button
          key='merge_sync_modal'
          type='primary'
          onClick={() => handleOk(onOk(true))}>
          Yes, merge
        </Button>
      ]}
    />
  )
}

export default SyncModal
