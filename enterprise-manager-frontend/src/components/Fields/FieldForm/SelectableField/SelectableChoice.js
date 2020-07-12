import React, { useState } from "react"
import SelectableResources from "./SelectableResources"
import SelectableOptions from "./SelectableOptions"
import { Radio, Divider } from "antd"

const SelectableChoice = props => {
  const { field, fieldType, handleChange, handleSelectable, resourceId } = props
  const { selectableResourceAttributes } = field
  const choice = selectableResourceAttributes
    ? selectableResourceAttributes.optionsAttributes.length > 0
      ? "connect"
      : "items"
    : null
  const [state, setState] = useState({ choice: field ? choice : "" })

  console.log(state)

  return (
    <Radio.Group style={{ width: "100%" }} name='choice' value={state.choice}>
      <Divider />
      <Radio
        name='choice'
        value='connect'
        onChange={e => setState({ choice: e.target.value })}
        checked={state.choice === "connect"}>
        Connect to a Resource
      </Radio>
      <Radio
        name='choice'
        value='items'
        onChange={e => setState({ choice: e.target.value })}
        defaultChecked={state.choice === "items"}>
        Add Items Individually
      </Radio>
      {state.choice === "connect" && (
        <SelectableResources
          resourceId={resourceId}
          field={field}
          handleSelectable={handleSelectable}
        />
      )}
      {state.choice === "items" && (
        <SelectableOptions
          resourceId={resourceId}
          field={field}
          fieldType={fieldType}
          handleChange={handleChange}
          handleSelectable={handleSelectable}
        />
      )}
    </Radio.Group>
  )
}

export default SelectableChoice
