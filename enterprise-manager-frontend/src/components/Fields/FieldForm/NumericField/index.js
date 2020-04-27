import React from "react";
import Icon from "@mdi/react";
import { mdiNumeric } from "@mdi/js";
import FieldTypeWrapper from "../../FieldTypeWrapper";
import NumericFieldOptions from "./NumericFieldOptions";

const NumericField = ({ fieldType, onChange }) => {
  const handleChange = e => {
    onChange({
      fieldType: e.target.value
    });
  };
  return (
    <>
      <FieldTypeWrapper
        id="numeric_field"
        fieldType={fieldType}
        value={"numeric_field"}
        onChange={handleChange}>
        Numeric Field
        <Icon
          path={mdiNumeric}
          title="Numeric Field"
          size={1}
          color="#07689F"
        />
      </FieldTypeWrapper>
      <NumericFieldOptions fieldType={fieldType} handleChange={handleChange} />
    </>
  );
};
export default NumericField;
