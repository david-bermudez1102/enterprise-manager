import React from "react";
import SelectableChoice from "./SelectableChoice";
import Icon from "@mdi/react";
import { mdiSelectPlace } from "@mdi/js";

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
            name="fieldType"
            id="selectable_field"
            value="selectable"
            onChange={handleChange}
            checked={fieldType === "selectable" ? true : false}
          />
          <label htmlFor="selectable_field" className="form-check-label">
            Selectable Field
            <Icon
              path={mdiSelectPlace}
              title="Selectable Field"
              size={1}
              color="#07689F"
            />
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
