import React from "react";

const TextField = props => {
  const { field, onChange, ...newProps } = props;
  const handleChange = e => {
    onChange({
      recordFieldId: props.name,
      content: e.target.value
    });
  };

  return <input {...newProps} onChange={handleChange} />;
};

export default TextField;
