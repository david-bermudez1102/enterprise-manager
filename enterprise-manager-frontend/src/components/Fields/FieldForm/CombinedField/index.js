import React from "react";
import FieldTypeWrapper from "../../FieldTypeWrapper";
import Icon from "@mdi/react";
import { mdiCheckboxMultipleBlank } from "@mdi/js";
import CombinedFieldOptions from "./CombinedFieldOptions";

const CombinedField = ({
  field,
  resourceId,
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
          path={mdiCheckboxMultipleBlank}
          title="Combined Fields"
          size={1}
          color="#07689F"
        />
      </FieldTypeWrapper>
      <CombinedFieldOptions
        resourceId={resourceId}
        fieldType={fieldType}
        handleChange={handleChange}
      />
    </>
  );
};

export default CombinedField;
