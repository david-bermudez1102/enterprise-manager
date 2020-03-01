import React from "react";

const PasswordField = ({ fieldType, handleChange, handleSelectableChange }) => {
  return (
    <div className="form-check form-check-inline">
      <input
        className="form-check-input"
        type="radio"
        name="field_type"
        id="password_field"
        value="password"
        onChange={event => {
          handleSelectableChange(
            {
              form_id: "",
              selectable_resource_id: "",
              _destroy: 1
            },
            []
          );
          handleChange(event);
        }}
        defaultChecked={fieldType === "password" ? true : false}
      />
      <label htmlFor="password_field" className="form-check-label">
        Password Field
      </label>
    </div>
  );
};
export default PasswordField;
