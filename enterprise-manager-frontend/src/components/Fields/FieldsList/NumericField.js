import React from "react";

const NumericField = props => {
  const { field, onChange, ...newProps } = props;

  const handleChange = e => {
    onChange({
      recordFieldId: props.name,
      content: e.target.value
    });
  };

  return (
    <input
      {...newProps}
      type="number"
      onChange={handleChange}
      step={field.acceptsDecimals ? "any" : undefined}
      onInvalid={e => (e.target.value = "")}
      onBlur={e => e.target.checkValidity()}
    />
  );
};

export default NumericField;
