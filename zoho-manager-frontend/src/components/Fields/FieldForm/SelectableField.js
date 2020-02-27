import React from "react";

const SelectableField = ({ handleOnChange }) => {
  return (
    <div className="form-check form-check-inline">
      <input
        className="form-check-input"
        type="radio"
        name="field_type"
        id="selectable_field"
        value="selectable"
        onChange={handleOnChange}
      />
      <label htmlFor="selectable_field" className="form-check-label">
        Selectable Field
      </label>
      Connect to:
    </div>
  );
};
export default SelectableField;
