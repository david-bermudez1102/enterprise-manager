import React from "react";
import Icon from "@mdi/react";
import { mdiTextarea } from "@mdi/js";
import { useHandleChange } from "../../Hooks/useHandleChange";

const TextareaField = ({ field, fieldType, onChange }) => {
  const [handleChange] = useHandleChange({ field, onChange });
  return (
    <div className="col-auto order-first my-auto">
      <div className="form-check form-check-inline">
        <input
          className="form-check-input"
          type="radio"
          name="fieldType"
          id="textarea_field"
          value="textarea"
          onChange={handleChange}
          checked={fieldType === "textarea" ? true : false}
        />
        <label htmlFor="textarea_field" className="form-check-label">
          Text Area
          <Icon
            path={mdiTextarea}
            title="Textarea Field"
            size={1}
            color="#07689F"
          />
        </label>
      </div>
    </div>
  );
};
export default TextareaField;
