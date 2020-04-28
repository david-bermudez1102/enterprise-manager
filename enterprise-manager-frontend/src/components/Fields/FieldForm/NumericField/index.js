import React from "react";
import Icon from "@mdi/react";
import { mdiNumeric } from "@mdi/js";
import FieldTypeWrapper from "../../FieldTypeWrapper";
import NumericFieldOptions from "./NumericFieldOptions";
import { useHandleChange } from "../../Hooks/useHandleChange";

const NumericField = ({ field, fieldType, onChange }) => {
  const { handleChange, handleNumericField } = useHandleChange({
    field,
    onChange
  });
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
      <NumericFieldOptions
        fieldType={fieldType}
        handleChange={handleNumericField}
      />
    </>
  );
};
export default NumericField;
