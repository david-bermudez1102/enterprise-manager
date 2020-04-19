import React from "react";

const FieldTypeWrapper = ({ id, value, fieldType, onChange, children }) => {
  return (
    <div className="col-auto order-first my-auto">
      <div className="form-check form-check-inline">
        <input
          className="form-check-input"
          type="radio"
          name="fieldType"
          id={id}
          value={value}
          onChange={onChange}
          checked={fieldType === value ? true : false}
        />
        <label htmlFor={id} className="form-check-label">
          {children}
        </label>
      </div>
    </div>
  );
};
export default FieldTypeWrapper;
