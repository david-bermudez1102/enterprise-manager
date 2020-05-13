import React from "react";
import Icon from "@mdi/react";
import { mdiTextbox } from "@mdi/js";
import { useHandleChange } from "../../Hooks/useHandleChange";
import { Col, Radio } from "antd";

const TextField = ({ field, fieldType, onChange }) => {
  const { handleChange } = useHandleChange({ field, onChange });

  return (
    <Col span={"auto"} order={1}>
      <Radio
        name="fieldType"
        id="text_field"
        value="text"
        onChange={handleChange}
        checked={fieldType === "text" ? true : false}>
        Text Field{" "}
        <Icon path={mdiTextbox} title="Text Field" size={1} color="#07689F" />
      </Radio>
    </Col>
  );
};
export default TextField;
