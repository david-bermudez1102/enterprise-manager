import React from "react";
import { Input } from "antd";
import FieldTypeWrapper from "../FieldTypeWrapper";

const KeyField = props => {
  const { keyValues, recordKeyAttributes } = props.field;
  let keyValue = null;

  const generateKeyValue = () => {
    const date = new Date()
      .toLocaleDateString("en-US", {
        year: "2-digit",
        month: "2-digit",
      })
      .replace(/[&/\\#,+()$~%.'":*?<>{}]/g, "");
    const keyValuesCount =
      keyValues.filter(kV => kV.value.includes(date)).length + 1;
    return { value: date + "-" + keyValuesCount };
  };

  if (props.fields.some(r => r.id === recordKeyAttributes.resourceFieldId)) {
    keyValue =
      keyValues
        .sort((kV_a, kV_b) => kV_b.id - kV_a.id)
        .find(
          kV =>
            props.state.some(v => v.recordValueId === kV.recordValueId) &&
            props.fields.some(r => r.id === recordKeyAttributes.resourceFieldId)
        ) || generateKeyValue();
  }

  return (
    <FieldTypeWrapper name={props.name} field={props.field}>
      <Input {...props} value={keyValue ? keyValue.value : ""} />
    </FieldTypeWrapper>
  );
};

export default KeyField;
