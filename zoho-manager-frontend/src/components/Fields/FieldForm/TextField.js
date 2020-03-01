import React from "react";

const TextField = ({
  field,
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
        Text Field
      </label>
    </div>
  );
};
export default TextField;
