import React from "react";
import Icon from "@mdi/react";
import { mdiNumeric } from "@mdi/js";
import FieldTypeWrapper from "../../FieldTypeWrapper";
import NumericFieldOptions from "./NumericFieldOptions";
import { useHandleChange } from "../../Hooks/useHandleChange";
import { Radio, Col } from "antd";

const NumericField = ({ field, fieldType, onChange }) => {
  const { handleChange, handleNumericField } = useHandleChange({
    field,
    onChange,
  });
  return (
    <>
      <Col span={"auto"} order={1}>
        <Radio
          id="numeric_field"
          name={"fieldType"}
          value={"numeric_field"}
          onChange={handleChange}
          checked={fieldType === "numeric_field" ? true : false}>
          Numeric Field
          <Icon
            path={mdiNumeric}
            title="Numeric Field"
            size={1}
            color="#07689F"
          />
        </Radio>
      </Col>
      <NumericFieldOptions
        fieldType={fieldType}
        handleChange={handleNumericField}
        field={field}
      />
    </>
  );
};
export default NumericField;
