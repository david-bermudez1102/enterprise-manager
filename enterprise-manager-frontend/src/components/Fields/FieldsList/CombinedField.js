import React from "react";
import FieldValueGenerator from "../FieldValueGenerator";

const CombinedField = props => {
  const { field, editingMode, onChange, ...newProps } = props;

  const handleChange = e => {
    onChange({
      recordFieldId: props.name,
      content: e.target.value,
    });
  };

  return field.combinedFields.length > 1 ? (
    <FieldValueGenerator
      {...newProps}
      onChange={handleChange}
      combinedFields={field.combinedFields}
      fieldFormat={field.fieldFormat}
      required
    />
  ) : null;
};

export default CombinedField;
