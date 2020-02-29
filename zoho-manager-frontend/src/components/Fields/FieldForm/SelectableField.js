import React from "react";
import SelectableResources from "./SelectableResources";
import SelectableOptions from "./SelectableOptions";

const SelectableField = ({
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
        />
        <label htmlFor="selectable_field" className="form-check-label">
          Selectable Field
        </label>
      </div>
      {fieldType === "selectable" ? (
        <SelectableResources handleSelectableChange={handleSelectableChange} />
      ) : null}
      {fieldType === "selectable" ? (
        <SelectableOptions
          fieldType={fieldType}
          handleSelectableChange={handleSelectableChange}
        />
      ) : null}
    </>
  );
};
export default SelectableField;
