import React from "react";
import Icon from "@mdi/react";
import { mdiCalendarRange } from "@mdi/js";
import { useHandleChange } from "../../Hooks/useHandleChange";
import { Radio, Col } from "antd";

const DateField = ({ field, fieldType, onChange }) => {
  const { handleChange } = useHandleChange({ field, onChange });
  return (
    <Col span={"auto"} order={1}>
      <Radio
        type="radio"
        name="fieldType"
        id="date_field"
        value="date_field"
        onChange={handleChange}
        checked={fieldType === "date_field" ? true : false}>
        Date Field
        <Icon
          path={mdiCalendarRange}
          title="Date Field"
          size={1}
          color="#07689F"
        />
      </Radio>
    </Col>
  );
};
export default DateField;
