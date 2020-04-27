import React from "react";
import Icon from "@mdi/react";
import { mdiTextbox } from "@mdi/js";
import { useHandleChange } from "../../Hooks/useHandleChange";

const TextField = ({ field, fieldType, onChange }) => {
  const [handleChange] = useHandleChange({ field, onChange });

  return (
    <div className="col-auto order-first my-auto">
      <div className="form-check form-check-inline">
        <input
          className="form-check-input"
          type="radio"
          name="fieldType"
          id="text_field"
          value="text"
          onChange={handleChange}
          checked={fieldType === "text" ? true : false}
        />
        <label htmlFor="text_field" className="form-check-label">
          Text Field
          <Icon path={mdiTextbox} title="Text Field" size={1} color="#07689F" />
        </label>
      </div>
    </div>
  );
};
export default TextField;
