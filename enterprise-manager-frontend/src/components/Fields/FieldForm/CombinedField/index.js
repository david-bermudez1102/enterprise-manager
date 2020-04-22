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
        id="combined_fields"
        fieldType={fieldType}
        value={"combined_fields"}
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
          title="Combined Fields"
          size={1}
          color="#07689F"
        />
      </FieldTypeWrapper>
    </>
  );
};

export default CombinedFields;
