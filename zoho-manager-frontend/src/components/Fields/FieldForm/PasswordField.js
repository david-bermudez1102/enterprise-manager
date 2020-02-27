import React from "react";

const PasswordField = ({ handleOnChange }) => {
  return (
    <div className="form-check form-check-inline">
      <input
        className="form-check-input"
        type="radio"
        name="field_type"
        id="password_field"
        value="password"
        onChange={handleOnChange}
      />
      <label htmlFor="password_field" className="form-check-label">
        Password Field
      </label>
    </div>
  );
};
export default PasswordField;
