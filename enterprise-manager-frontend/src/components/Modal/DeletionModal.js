import React from "react"
import { Modal } from "antd"
import ExclamationCircleOutlined from "@ant-design/icons/ExclamationCircleOutlined"

const { confirm } = Modal
const DeletionModal = React.memo(
  ({ state, handleOk, handleCancel, modalProps }) => {
    const { visible, confirmLoading, ModalText } = state
    const { title, text, action } = modalProps
    return (
      <Modal
        title={title}
        visible={visible}
        onOk={() => handleOk(action)}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}>
        <p>{ModalText || text}</p>
      </Modal>
    )
  }
)

function showDeleteConfirm(title, content, handleOk, handleCancel, state) {
  confirm({
    title,
    icon: <ExclamationCircleOutlined />,
    content,
    okText: "Yes",
    okType: "danger",
    cancelText: "No",
    onOk: handleOk,
    onCancel: handleCancel
  })
}

export { DeletionModal as default, showDeleteConfirm }
