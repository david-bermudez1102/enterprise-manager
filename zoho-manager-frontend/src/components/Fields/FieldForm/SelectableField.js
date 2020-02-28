import React from "react";
import SelectableResources from "./SelectableResources";
import SelectableOptions from "./SelectableOptions";

const SelectableField = ({
  field_type,
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
      {field_type === "selectable" ? (
        <SelectableResources handleSelectableChange={handleSelectableChange} />
      ) : null}
      {field_type === "selectable" ? <SelectableOptions /> : null}
    </>
  );
};
export default SelectableField;
