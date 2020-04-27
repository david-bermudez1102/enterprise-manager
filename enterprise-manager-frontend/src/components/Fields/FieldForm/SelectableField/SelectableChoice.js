import React, { useState } from "react";
import SelectableResources from "./SelectableResources";
import SelectableOptions from "./SelectableOptions";

const SelectableChoice = props => {
  const { field, fieldType, handleChange, handleSelectable } = props;
  const { selectableResourceAttributes } = field;
  const choice = selectableResourceAttributes
    ? selectableResourceAttributes.options.length > 0
      ? "connect"
      : "items"
    : null;
  const [state, setState] = useState({ choice: field ? choice : "" });

  return (
    <div className="form-group mb-0">
      <hr />
      <div className="form-check form-check-inline">
        <input
          className="form-check-input"
          type="radio"
          name="choice"
          value="connect"
          onChange={e => setState({ choice: e.target.value })}
          checked={state.choice === "connect" ? true : false}
        />
        <label htmlFor="selectable_field" className="form-check-label">
          Connect to a Resource
        </label>
      </div>
      <div className="form-check form-check-inline">
        <input
          className="form-check-input"
          type="radio"
          name="choice"
          value="items"
          onChange={e => setState({ choice: e.target.value })}
          defaultChecked={state.choice === "items" ? true : false}
        />
        <label htmlFor="selectable_field" className="form-check-label">
          Add Items Individually
        </label>
      </div>
      {state.choice === "connect" ? (
        <SelectableResources
          field={field}
          handleSelectable={handleSelectable}
        />
      ) : null}
      {state.choice === "items" ? (
        <SelectableOptions
          field={field}
          fieldType={fieldType}
          handleChange={handleChange}
          handleSelectable={handleSelectable}
        />
      ) : null}
    </div>
  );
};

export default SelectableChoice;
