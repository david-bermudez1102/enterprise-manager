import React from "react";
import { Input } from "antd";
import FieldTypeWrapper from "../FieldTypeWrapper";

const TextAreaField = props => {
  const { field, name, onChange, ...newProps } = props;

  const handleChange = e => {
    onChange({
      recordFieldId: e.target.name,
      content: e.target.value,
    });
  };

  return (
    <FieldTypeWrapper name={name} field={field}>
      <Input.TextArea {...newProps} onChange={handleChange} />
    </FieldTypeWrapper>
  );
};

export default TextAreaField;
