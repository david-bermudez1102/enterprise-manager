import React from "react";
import Icon from "@mdi/react";
import { mdiTextboxPassword } from "@mdi/js";
import { useHandleChange } from "../../Hooks/useHandleChange";

const PasswordField = ({ field, fieldType, onChange }) => {
  const { handleChange } = useHandleChange({ field, onChange });
  return (
    <div className="col-auto order-first my-auto">
      <div className="form-check form-check-inline">
        <input
          className="form-check-input"
          type="radio"
          name="fieldType"
          id="password_field"
          value="password"
          onChange={handleChange}
          checked={fieldType === "password" ? true : false}
        />
        <label htmlFor="password_field" className="form-check-label">
          Password Field{" "}
          <Icon
            path={mdiTextboxPassword}
            title="Password Field"
            size={1}
            color="#07689F"
          />
        </label>
      </div>
    </div>
  );
};
export default PasswordField;
