import React from "react";
import { InputNumber } from "antd";
import FieldTypeWrapper from "../FieldTypeWrapper";

const NumericField = props => {
  const { field, onChange, name, suffix, ...newProps } = props;

  const handleChange = value => {
    onChange({
      recordFieldId: props.name,
      content: value,
    });
  };

  return (
    <FieldTypeWrapper name={name} field={field}>
      {React.cloneElement(suffix, {
        placement: "rightTop",
        children: (
          <InputNumber
            {...newProps}
            step={field.acceptsDecimals ? 0.1 : 1}
            suffix={suffix}
            style={{ width: "100%" }}
            onChange={handleChange}
          />
        ),
      })}
    </FieldTypeWrapper>
  );
};

export default NumericField;
