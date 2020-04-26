import React from "react";

const TextAreaField = props => {
  const { field, onChange, ...newProps } = props;

  const handleChange = e => {
    onChange({
      recordFieldId: e.target.name,
      content: e.target.value
    });
  };

  return <textarea {...newProps} onChange={handleChange} />;
};

export default TextAreaField;
