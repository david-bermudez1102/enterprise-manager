import React from "react";

const DateField = props => {
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
      type={"date"}
      onChange={handleChange}
      required={false}
    />
  );
};

export default DateField;
