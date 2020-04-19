import React from "react";
import Icon from "@mdi/react";
import { mdiNumeric } from "@mdi/js";
import FieldTypeWrapper from "../FieldTypeWrapper";

const NumberField = ({
  fieldType,
  handleChange,
  handleSelectableChange,
  selectableResourceAttributes
}) => (
  <FieldTypeWrapper
    id="number_field"
    fieldType={fieldType}
    value={"numberField"}
    onChange={event => {
      handleChange(event);
      handleSelectableChange(
        {
          ...selectableResourceAttributes,
          _destroy: 1
        },
        []
      );
    }}>
    Numeric Field
    <Icon path={mdiNumeric} title="Numeric Field" size={1} color="#07689F" />
  </FieldTypeWrapper>
);
export default NumberField;
