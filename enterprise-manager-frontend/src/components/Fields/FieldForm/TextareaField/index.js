import React from "react";
import { mdiTextarea } from "@mdi/js";
import { useHandleChange } from "../../Hooks/useHandleChange";
import { Col } from "antd";
import RadioWrapper from "../RadioWrapper";

const TextareaField = ({ field, fieldType, onChange }) => {
  const { handleChange } = useHandleChange({ field, onChange });
  return (
    <RadioWrapper
      name="fieldType"
      id="textarea_field"
      value="textarea"
      onChange={handleChange}
      iconPath={mdiTextarea}
      iconTitle={"Textarea Field"}
      fieldType={fieldType}>
      Text Area
    </RadioWrapper>
  );
};
export default TextareaField;
