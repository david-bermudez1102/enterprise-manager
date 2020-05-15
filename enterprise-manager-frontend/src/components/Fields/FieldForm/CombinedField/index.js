import React, { useCallback, useState, useEffect } from "react";
import { mdiCheckboxMultipleBlank } from "@mdi/js";
import CombinedFieldOptions from "./CombinedFieldOptions";
import { useHandleChange } from "../../Hooks/useHandleChange";
import { useSelector, shallowEqual } from "react-redux";
import { Col } from "antd";
import RadioWrapper from "../RadioWrapper";

const CombinedField = ({ field, resourceId, fieldType, onChange }) => {
  const { combinedFields, fieldFormat } = field;
  const { recordFields } = useSelector(
    ({ recordFields }) => ({ recordFields }),
    shallowEqual
  );

  const [state, setState] = useState(
    combinedFields ? { combinedFields } : null
  );
  const { handleChange, handleCombinedField } = useHandleChange({
    field,
    onChange,
  });

  const handleCombinedFieldChange = useCallback(
    newState => setState({ ...state, ...newState }),
    // eslint-disable-next-line
    []
  );

  useEffect(() => {
    if (state) handleCombinedField(state);
    // eslint-disable-next-line
  }, [state]);

  return (
    <>
      <RadioWrapper
        id="combined_field"
        name="fieldType"
        value={"combined_field"}
        onChange={handleChange}
        iconPath={mdiCheckboxMultipleBlank}
        iconTitle={"Combined Fields"}
        fieldType={fieldType}>
        Combined Fields
      </RadioWrapper>
      <CombinedFieldOptions
        initialState={
          combinedFields
            ? recordFields
                .filter(f => combinedFields.some(cF => cF === f.id))
                .map(f => ({ id: f.id, value: f.name }))
            : null
        }
        fieldFormat={fieldFormat}
        resourceId={resourceId}
        fieldType={fieldType}
        handleChange={handleCombinedFieldChange}
      />
    </>
  );
};

export default CombinedField;
