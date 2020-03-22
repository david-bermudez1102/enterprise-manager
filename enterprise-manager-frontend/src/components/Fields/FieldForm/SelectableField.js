import React from "react";
import SelectableChoice from "./SelectableChoice";

const SelectableField = ({
  field,
  fieldType,
  handleChange,
  handleSelectableChange,
  selectableResourceAttributes
}) => {
  return (
    <>
      <div className="col-auto order-first my-auto">
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            name="field_type"
            id="selectable_field"
            value="selectable"
            onChange={handleChange}
            checked={fieldType === "selectable" ? true : false}
          />
          <label htmlFor="selectable_field" className="form-check-label">
            <i className="fad fa-chevron-square-down"></i> Selectable Field
          </label>
        </div>
      </div>
      {fieldType === "selectable" ? (
        <div className="col-12 order-last my-auto">
          <SelectableChoice
            field={field}
            fieldType={fieldType}
            handleSelectableChange={handleSelectableChange}
            handleChange={handleChange}
            selectableResourceAttributes={selectableResourceAttributes}
          />
        </div>
      ) : null}
    </>
  );
};
export default SelectableField;
