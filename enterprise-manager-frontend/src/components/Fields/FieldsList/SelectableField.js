import React, { useCallback, useState, useEffect } from "react";
import { Select } from "antd";
import FieldTypeWrapper from "../FieldTypeWrapper";

const SelectableField = props => {
  const { field, fieldName, suffix, name, onChange, ...newProps } = props;
  const [state, setState] = useState(null);

  const handleChange = useCallback((value, option) => {
    if (field.selectableResourceAttributes)
      setState({
        recordFieldId: props.name,
        recordValueId: option ? option.id : undefined,
        content: option ? option.value : undefined,
      });
    else
      setState({
        recordFieldId: props.name,
        recordOptionId: option ? option.id : undefined,
        content: option ? option.value : undefined,
      });
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (state) onChange(state);
    // eslint-disable-next-line
  }, [state]);

  return (
    <FieldTypeWrapper name={name} field={field}>
      {React.cloneElement(suffix, {
        placement: "rightTop",
        children: (
          <Select
            showSearch
            placeholder={`Select a ${field.name.toLowerCase()}`}
            allowClear
            optionFilterProp="children"
            onChange={handleChange}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }>
            {field.selectableResourceAttributes
              ? field.selectableResourceAttributes.optionsAttributes.map(
                  option => (
                    <Select.Option
                      key={`selectable_option_${field.id}_${option.id}`}
                      id={option.id}
                      value={option.value}>
                      {option.value}
                    </Select.Option>
                  )
                )
              : field.optionsAttributes.map(option => (
                  <Select.Option
                    key={`selectable_option_${field.id}_${option.id}`}
                    id={option.id}
                    value={option.value}>
                    {option.value}
                  </Select.Option>
                ))}
          </Select>
        ),
      })}
    </FieldTypeWrapper>
  );
};

export default SelectableField;
