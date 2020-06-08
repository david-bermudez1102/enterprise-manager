import React from "react"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { Spin } from "antd"
import { LoadingOutlined } from "@ant-design/icons"

const useModal = props => {
  const initialState = {
    visible: false,
    ModalText: null,
    confirmLoading: false
  }

  const [state, setState] = useState(initialState)
  const [modalProps, setModalProps] = useState({})
  const dispatch = useDispatch()

  const showModal = modalProps => {
    setState({ ...state, visible: true })
    setModalProps(modalProps)
  }

  const handleOk = action => {
    setState({
      ...state,
      ModalText: (props || {}).loadingText || (
        <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
      ),
      confirmLoading: true
    })
    dispatch(action).then(() => {
      setState({ ...state, visible: false, confirmLoading: false })
    })
  }

  const handleCancel = () => {
    setState({ ...state, visible: false })
  }

  return { state, showModal, handleOk, handleCancel, modalProps }
}

export default useModal
