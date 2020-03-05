import React from "react";
import SelectableChoice from "./SelectableChoice";

const SelectableField = ({
  field,
  fieldType,
  handleChange,
  handleSelectableChange
}) => {
  return (
    <>
      <div className="form-check form-check-inline">
        <input
          className="form-check-input"
          type="radio"
          name="field_type"
          id="selectable_field"
          value="selectable"
          onChange={handleChange}
          defaultChecked={fieldType === "selectable" ? true : false}
        />
        <label htmlFor="selectable_field" className="form-check-label">
          <i className="fad fa-chevron-square-down"></i>Selectable Field
        </label>
      </div>
      {fieldType === "selectable" ? (
        <SelectableChoice
          field={field}
          fieldType={fieldType}
          handleSelectableChange={handleSelectableChange}
          handleChange={handleChange}
        />
      ) : null}
    </>
  );
};
export default SelectableField;
