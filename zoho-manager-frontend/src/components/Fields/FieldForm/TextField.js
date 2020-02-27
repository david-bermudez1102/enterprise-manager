import React from "react";

const TextField = ({ handleOnChange }) => {
  return (
    <div className="form-check form-check-inline">
      <input
        className="form-check-input"
        type="radio"
        name="field_type"
        id="text_field"
        value="text"
        onChange={handleOnChange}
      />
      <label htmlFor="text_field" className="form-check-label">
        Text Field
      </label>
    </div>
  );
};
export default TextField;
