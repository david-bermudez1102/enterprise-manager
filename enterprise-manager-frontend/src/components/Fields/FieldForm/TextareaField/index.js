import React from "react";
import Icon from "@mdi/react";
import { mdiTextarea } from "@mdi/js";
import { useHandleChange } from "../../Hooks/useHandleChange";
import { Col, Radio } from "antd";

const TextareaField = ({ field, fieldType, onChange }) => {
  const { handleChange } = useHandleChange({ field, onChange });
  return (
    <Col span={"auto"} order={1}>
      <Radio
        name="fieldType"
        id="textarea_field"
        value="textarea"
        onChange={handleChange}
        checked={fieldType === "textarea" ? true : false}>
        Text Area
        <Icon
          path={mdiTextarea}
          title="Textarea Field"
          size={1}
          color="#07689F"
        />
      </Radio>
    </Col>
  );
};
export default TextareaField;
