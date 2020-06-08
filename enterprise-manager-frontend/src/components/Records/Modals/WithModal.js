import React from "react"
import Modal from "antd/lib/modal/Modal"

const WithModal = ({ state, handleOk, handleCancel, modalProps, footer }) => {
  const { visible, confirmLoading, ModalText } = state || {}
  const { title, text, action } = modalProps || {}
  return (
    <Modal
      title={title}
      visible={visible}
      onOk={action ? () => handleOk(action) : undefined}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
      destroyOnClose
      zIndex={2000}
      footer={footer}>
      {ModalText || text}
    </Modal>
  )
}

export default WithModal
