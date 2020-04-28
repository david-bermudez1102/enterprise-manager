import React, { useCallback, useState, useEffect } from "react";
import SelectableInput from "../SelectableInput";

const SelectableField = props => {
  const { field, fieldName, onChange, ...newProps } = props;
  const [state, setState] = useState(null);

  const handleChange = useCallback(option => {
    if (field.selectableResourceAttributes)
      setState({
        recordFieldId: props.name,
        recordValueId: option.id,
        content: option.value
      });
    else
      setState({
        recordFieldId: props.name,
        recordOptionId: option.id,
        content: option.value
      });
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (state) onChange(state);
    // eslint-disable-next-line
  }, [state]);

  return (
    <SelectableInput
      {...newProps}
      onChange={handleChange}
      options={
        field.selectableResourceAttributes
          ? field.selectableResourceAttributes.optionsAttributes
          : field.optionsAttributes
      }>
      <label htmlFor={field.fieldAlias} className={"form-control-placeholder"}>
        {fieldName}
      </label>
    </SelectableInput>
  );
};

export default SelectableField;
