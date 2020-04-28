import React from "react";

const KeyField = props => {
  const { keyValues, recordKeyAttributes } = props.field;
  let keyValue = null;

  const generateKeyValue = () => {
    const date = new Date()
      .toLocaleDateString("en-US", {
        year: "2-digit",
        month: "2-digit"
      })
      .replace(/[&/\\#,+()$~%.'":*?<>{}]/g, "");
    const keyValuesCount =
      keyValues.filter(kV => kV.value.includes(date)).length + 1;
    return { value: date + "-" + keyValuesCount };
  };

  if (props.fields.some(r => r.id === recordKeyAttributes.resourceFieldId)) {
    keyValue =
      keyValues.find(
        kV =>
          props.state.some(v => v.recordValueId === kV.recordValueId) &&
          props.fields.some(r => r.id === recordKeyAttributes.resourceFieldId)
      ) || generateKeyValue();
  }

  console.log(props.fields, props.state);

  return (
    <input {...props} type="text" value={keyValue ? keyValue.value : ""} />
  );
};

export default KeyField;
