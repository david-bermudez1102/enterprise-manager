import React from "react";
import Icon from "@mdi/react";
import { mdiTextboxPassword } from "@mdi/js";

const PasswordField = ({
  fieldType,
  handleChange,
  handleSelectableChange,
  selectableResourceAttributes
}) => {
  return (
    <div className="form-check form-check-inline">
      <input
        className="form-check-input"
        type="radio"
        name="field_type"
        id="password_field"
        value="password"
        onChange={event => {
          handleChange(event);
          handleSelectableChange(
            {
              ...selectableResourceAttributes,
              _destroy: 1
            },
            []
          );
        }}
        defaultChecked={fieldType === "password" ? true : false}
      />
      <label htmlFor="password_field" className="form-check-label">
        Password Field{" "}
        <Icon
          path={mdiTextboxPassword}
          title="Password Field"
          size={2}
          color="#07689F"
        />
      </label>
    </div>
  );
};
export default PasswordField;
