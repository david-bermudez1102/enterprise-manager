import React from "react";

const Modal = ({ title, handleClose, message, children }) => {
  return (
    <div
      className="d-block w-100 h-100 fixed-top m-0 text-dark"
      style={{
        backgroundColor: "rgba(0,0,0,0.5)",
        top: 0,
        left: 0
      }}>
      <div className="modal d-block" tabIndex="-1" role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{title}</h5>
              <button type="button" className="close" onClick={handleClose}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">{message}</div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={handleClose}>
                Cancel
              </button>
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
