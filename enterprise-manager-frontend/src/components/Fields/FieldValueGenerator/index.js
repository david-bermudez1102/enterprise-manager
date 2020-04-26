import React, { useState, useEffect } from "react";
import { formatValues } from "./formatValues";

const FieldValueGenerator = props => {
  const { children, combinedFields, fieldFormat, state, ...newProps } = props;
  const [value, setValue] = useState("");

  useEffect(() => {
    setValue(
      formatValues(
        fieldFormat,
        state
          .filter(v =>
            combinedFields.some(
              recordFieldId => recordFieldId === v.recordFieldId
            )
          )
          .map(val => val.content)
      )
    );
  }, [state, combinedFields, fieldFormat]);

  return <input {...newProps} type="text" value={value} />;
};

export default FieldValueGenerator;
