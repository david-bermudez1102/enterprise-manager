import React from "react";
import { Link } from "react-router-dom";

export const DeletionModal = ({ content, url, handleClose }) => {

  return (
    <div className="">
      <div className="modal d-block" tabIndex="-1" role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Delete This Field?</h5>
              <button type="button" className="close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              Are you sure you want to delete this content?
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={handleClose}>
                Cancel
              </button>
              <button type="button" className="btn btn-danger">
                <Link to={`${url}/${content.id}/delete`}>
                  Delete column and field
                </Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
