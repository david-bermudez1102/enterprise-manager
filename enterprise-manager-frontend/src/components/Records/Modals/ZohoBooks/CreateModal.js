import React from "react"
import { Button } from "antd"
import WithModal from "../WithModal"
import { plural } from "pluralize"
import { zohoApi } from "../../../../actions/zohoBooksActions"
import { prepareRecords } from "../../../../containers/ZohoBooks/prepareData"
import { useSelector, shallowEqual } from "react-redux"

const CreateModal = props => {
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

  const { fields } = useSelector(({ fields }) => ({ fields }), shallowEqual)

  const onOk = () =>
    zohoApi(
      {
        formId: resource.id,
        organizationId: resource.organizationId
      },
      connectionType,
      "",
      prepareRecords(
        selectedRows.length > 0 ? selectedRows : values,
        connectionType,
        (fields[resource.id] || []).some(
          field =>
            field.name === "invoice_number" ||
            field.zohoFieldName === "invoice_number"
        )
          ? "invoice_number"
          : "customer_id"
      )
    )

  console.log(connectionType)
  return (
    <WithModal
      {...useModalProps}
      modalProps={{
        ...modalProps,
        title: <>Send {plural(connectionType)} to ZohoBooks?</>,
        text: <>Any unsent {connectionType} will be created in ZohoBooks</>
      }}
      footer={[
        <Button key='cancel_sync_modal' onClick={props.handleCancel}>
          Cancel
        </Button>,
        <Button
          key='merge_sync_modal'
          type='primary'
          onClick={() => handleOk(onOk())}>
          Yes, Send
        </Button>
      ]}
    />
  )
}

export default CreateModal
