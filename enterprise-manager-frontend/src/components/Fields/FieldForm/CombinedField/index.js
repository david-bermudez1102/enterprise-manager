import React, { useState, useEffect, useCallback } from "react";
import FieldTypeWrapper from "../../FieldTypeWrapper";
import Icon from "@mdi/react";
import { mdiCheckboxMultipleBlank } from "@mdi/js";
import CombinedFieldOptions from "./CombinedFieldOptions";

const CombinedField = ({ resourceId, fieldType, onChange }) => {
  const [state, setState] = useState(null);

  const handleChange = e => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleCombinedField = useCallback(newState => {
    setState({ ...state, ...newState });
  }, []);

  useEffect(() => {
    if (state) onChange(state);
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
        handleChange={handleCombinedField}
      />
    </>
  );
};

export default CombinedField;
