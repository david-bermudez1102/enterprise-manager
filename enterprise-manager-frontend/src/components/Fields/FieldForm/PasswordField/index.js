import React from "react";
import { mdiTextboxPassword } from "@mdi/js";
import { useHandleChange } from "../../Hooks/useHandleChange";
import RadioWrapper from "../RadioWrapper";

const PasswordField = ({ field, fieldType, onChange }) => {
  const { handleChange } = useHandleChange({ field, onChange });
  return (
    <RadioWrapper
      name="fieldType"
      id="password_field"
      value="password"
      onChange={handleChange}
      iconPath={mdiTextboxPassword}
      iconTitle={"Password Field"}
      fieldType={fieldType}>
      Password Field
    </RadioWrapper>
  );
};
export default PasswordField;
