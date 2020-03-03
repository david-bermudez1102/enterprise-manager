import React from "react";
import Icon from "@mdi/react";
import { mdiTextbox } from "@mdi/js";

const TextField = ({
  fieldType,
  handleChange,
  handleSelectableChange
}) => {
  return (
    <div className="form-check form-check-inline">
      <input
        className="form-check-input"
        type="radio"
        name="field_type"
        id="text_field"
        value="text"
        onChange={event => {
          handleSelectableChange(
            {
              form_id: "",
              selectable_resource_id: "",
              _destroy: 1
            },
            [{}]
          );
          handleChange(event);
        }}
        defaultChecked={fieldType === "text" ? true : false}
      />
      <label htmlFor="text_field" className="form-check-label">
        Text Field{" "}
        <Icon path={mdiTextbox} title="Text Field" size={2} color="#07689F" />
      </label>
    </div>
  );
};
export default TextField;
