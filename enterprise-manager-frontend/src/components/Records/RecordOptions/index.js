import React from "react";
import ZohoBooks from "../../../containers/ZohoBooks/favicon.ico";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { removeRecord } from "../../../actions/recordActions";

const RecordOptions = ({ record, checked, selectRecord }) => {
  const dispatch = useDispatch();
  const { session } = useSelector(({ session }) => ({ session }), shallowEqual);
  return (
    <div className="d-flex flex-nowrap align-items-center">
      <div className="check mr-2">
        <input
          type="checkbox"
          name={"selectedRecord"}
          id={`record_${record.id}`}
          onChange={() => selectRecord(record)}
          checked={checked}
        />
        <label
          htmlFor={`record_${record.id}`}
          className="d-flex flex-nowrap m-0 p-0 align-items-center">
          <div className="box">
            <i className="fas fa-check"></i>
          </div>
        </label>
      </div>

      <button className="btn btn-transparent p-0 d-block-inline">
        <i
          className="fad fa-trash-alt text-danger mr-2"
          onClick={() =>
            dispatch(
              removeRecord(
                session.currentUser.organizationId,
                record.formId,
                record.id
              )
            )
          }></i>
      </button>
      <button className="btn btn-transparent p-0 d-block-inline">
        <i className="fad fa-archive text-info mr-2"></i>
      </button>
      <button className="btn btn-transparent p-0 mt-n1 d-block-inline">
        <img
          src={ZohoBooks}
          alt="ZohoBooks"
          style={{ filter: " grayscale(100%)", width: "16px" }}
        />
      </button>
    </div>
  );
};
export default React.memo(RecordOptions);
