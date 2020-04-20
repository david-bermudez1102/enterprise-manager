import React from "react";
import FieldTypeWrapper from "../../FieldTypeWrapper";
import Icon from "@mdi/react";

const CombinedFields = ({
  fieldType,
  handleChange,
  handleSelectableChange,
  selectableResourceAttributes
}) => {
  return (
    <>
      <FieldTypeWrapper
        id="combined_field"
        fieldType={fieldType}
        value={"combined_field"}
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
        Combined Fields
        <Icon
          path={mdiNumeric}
          title="Numeric Field"
          size={1}
          color="#07689F"
        />
      </FieldTypeWrapper>
    </>
  );
};

export default CombinedFields;
