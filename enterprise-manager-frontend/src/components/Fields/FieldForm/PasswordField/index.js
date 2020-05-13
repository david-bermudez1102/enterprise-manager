import React from "react";
import Icon from "@mdi/react";
import { mdiTextboxPassword } from "@mdi/js";
import { useHandleChange } from "../../Hooks/useHandleChange";
import { Radio, Col } from "antd";

const PasswordField = ({ field, fieldType, onChange }) => {
  const { handleChange } = useHandleChange({ field, onChange });
  return (
    <Col span={"auto"} order={1}>
      <Radio
        name="fieldType"
        id="password_field"
        value="password"
        onChange={handleChange}
        checked={fieldType === "password" ? true : false}>
        Password Field{" "}
        <Icon
          path={mdiTextboxPassword}
          title="Password Field"
          size={1}
          color="#07689F"
        />
      </Radio>
    </Col>
  );
};
export default PasswordField;
