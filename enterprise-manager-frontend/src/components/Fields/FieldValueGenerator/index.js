import React from "react";

const FieldValueGenerator = props => {
  const { children, combinedFields, fieldFormat, ...newProps } = props;

  return <input {...newProps} />;
};

export default FieldValueGenerator;
