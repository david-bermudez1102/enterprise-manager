import React, { useState, useEffect } from "react";
import SelectableChoice from "./SelectableChoice";
import Icon from "@mdi/react";
import { mdiSelectPlace } from "@mdi/js";

const SelectableField = props => {
  const { field, fieldType } = props;
  const [state, setState] = useState(null);

  const handleChange = e => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleSelectable = newState => {
    setState({ ...state, ...newState });
  };

  useEffect(() => {
    if (state) props.onChange(state);
  }, [state]);

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
            handleChange={handleChange}
            handleSelectable={handleSelectable}
          />
        </div>
      ) : null}
    </>
  );
};
export default SelectableField;
