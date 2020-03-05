import React from "react";
import { Link } from "react-router-dom";

export const DeletionModal = ({ content, url, handleClose, children }) => {
  return (
    <div className="">
      <div className="modal d-block" tabIndex="-1" role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Delete Field "{content.name}"?</h5>
              <button type="button" className="close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">{children}</div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleClose}>
                Cancel
              </button>
              <Link to={`${url}/${content.id}/delete`}>
                <button type="button" className="btn btn-danger">
                  Delete column and field
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
