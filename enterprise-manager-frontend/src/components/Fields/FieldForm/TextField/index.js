import React from "react";
import { mdiTextbox } from "@mdi/js";
import { useHandleChange } from "../../Hooks/useHandleChange";
import RadioWrapper from "../RadioWrapper";

const TextField = ({ field, fieldType, onChange }) => {
  const { handleChange } = useHandleChange({ field, onChange });

  return (
    <RadioWrapper
      name="fieldType"
      id="text_field"
      value="text"
      onChange={handleChange}
      iconPath={mdiTextbox}
      iconTitle={"Text Field"}
      fieldType={fieldType}>
      Text Field
    </RadioWrapper>
  );
};
export default TextField;
