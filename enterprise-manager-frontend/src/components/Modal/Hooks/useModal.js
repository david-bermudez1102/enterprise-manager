import { useState } from "react";
import { useDispatch } from "react-redux";

const useModal = () => {
  const initialState = {
    visible: false,
    ModalText: null,
    confirmLoading: false,
  };

  const [state, setState] = useState(initialState);
  const [modalProps, setModalProps] = useState({});
  const dispatch = useDispatch();

  const showModal = modalProps => {
    setState({ ...state, visible: true });
    setModalProps(modalProps);
  };

  const handleOk = action => {
    setState({
      ...state,
      ModalText: "The modal will be closed after two seconds",
      confirmLoading: true,
    });
    dispatch(action).then(() => {
      setState({ ...state, visible: false, confirmLoading: false });
    });
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setState({ ...state, visible: false });
  };

  return { state, showModal, handleOk, handleCancel, modalProps };
};

export default useModal;
