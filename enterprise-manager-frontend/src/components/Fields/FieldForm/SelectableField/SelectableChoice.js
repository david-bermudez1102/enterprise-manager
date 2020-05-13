import React, { useState } from "react";
import SelectableResources from "./SelectableResources";
import SelectableOptions from "./SelectableOptions";
import { Radio, Divider } from "antd";

const SelectableChoice = props => {
  const { field, fieldType, handleChange, handleSelectable } = props;
  const { selectableResourceAttributes } = field;
  const choice = selectableResourceAttributes
    ? selectableResourceAttributes.optionsAttributes.length > 0
      ? "connect"
      : "items"
    : null;
  const [state, setState] = useState({ choice: field ? choice : "" });

  return (
    <Radio.Group style={{ width: "100%" }} name="choice">
      <Divider />
      <Radio
        name="choice"
        value="connect"
        onChange={e => setState({ choice: e.target.value })}
        checked={state.choice === "connect" ? true : false}>
        Connect to a Resource
      </Radio>
      <Radio
        name="choice"
        value="items"
        onChange={e => setState({ choice: e.target.value })}
        defaultChecked={state.choice === "items" ? true : false}>
        Add Items Individually
      </Radio>
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
    </Radio.Group>
  );
};

export default SelectableChoice;
