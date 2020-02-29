import React from "react";
import SelectableChoice from "./SelectableChoice";

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
        <SelectableChoice
          fieldType={fieldType}
          handleSelectableChange={handleSelectableChange}
          handleChange={handleChange}
        />
      ) : null}
    </>
  );
};
export default SelectableField;
