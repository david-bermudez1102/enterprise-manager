import React from "react";
import FieldValueGenerator from "../FieldValueGenerator";

const CombinedField = props => {
  const { field, ...newProps } = props;
  return (
    <FieldValueGenerator
      {...newProps}
      combinedFields={field.combinedFields}
      fieldFormat={field.fieldFormat}
      readOnly
    />
  );
};

export default CombinedField;
