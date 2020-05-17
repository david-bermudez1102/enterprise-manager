import React from "react";
import { mdiCalendarRange } from "@mdi/js";
import { useHandleChange } from "../../Hooks/useHandleChange";
import RadioWrapper from "../RadioWrapper";

const DateField = ({ field, fieldType, onChange }) => {
  const { handleChange } = useHandleChange({ field, onChange });
  return (
    <RadioWrapper
      name="fieldType"
      id="date_field"
      value="date_field"
      onChange={handleChange}
      iconPath={mdiCalendarRange}
      iconTitle={"Date Field"}
      fieldType={fieldType}>
      Date Field
    </RadioWrapper>
  );
};
export default DateField;
