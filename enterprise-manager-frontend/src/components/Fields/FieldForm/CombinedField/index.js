import React, { useCallback, useState, useEffect } from "react";
import FieldTypeWrapper from "../../FieldTypeWrapper";
import Icon from "@mdi/react";
import { mdiCheckboxMultipleBlank } from "@mdi/js";
import CombinedFieldOptions from "./CombinedFieldOptions";
import { useHandleChange } from "../../Hooks/useHandleChange";
import { useSelector, shallowEqual } from "react-redux";
import { Radio, Col } from "antd";

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
      <Col span={"auto"} order={1}>
        <Radio
          id="combined_field"
          name="fieldType"
          value={"combined_field"}
          onChange={handleChange}
          checked={fieldType === "combined_field" ? true : false}>
          Combined Fields
          <Icon
            path={mdiCheckboxMultipleBlank}
            title="Combined Fields"
            size={1}
            color="#07689F"
          />
        </Radio>
      </Col>
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
