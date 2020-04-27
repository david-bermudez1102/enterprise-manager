import React, { useCallback, useState, useEffect } from "react";
import FieldTypeWrapper from "../../FieldTypeWrapper";
import Icon from "@mdi/react";
import { mdiCheckboxMultipleBlank } from "@mdi/js";
import CombinedFieldOptions from "./CombinedFieldOptions";
import { useHandleChange } from "../../Hooks/useHandleChange";

const CombinedField = ({ field, resourceId, fieldType, onChange }) => {
  const [state, setState] = useState(null);
  const [handleChange, handleCombinedField] = useHandleChange({
    field,
    onChange
  });

  const handleCombinedFieldChange = useCallback(
    newState => setState({ ...state, ...newState }),
    []
  );

  useEffect(() => {
    if (state) handleCombinedField(state);
    // eslint-disable-next-line
  }, [state]);

  return (
    <>
      <FieldTypeWrapper
        id="combined_field"
        fieldType={fieldType}
        value={"combined_field"}
        onChange={handleChange}>
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
        handleChange={handleCombinedFieldChange}
      />
    </>
  );
};

export default CombinedField;
