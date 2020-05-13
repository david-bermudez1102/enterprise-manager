import React from "react";
import SelectableChoice from "./SelectableChoice";
import Icon from "@mdi/react";
import { mdiSelectPlace } from "@mdi/js";
import { useHandleChange } from "../../Hooks/useHandleChange";
import { Col, Radio } from "antd";

const SelectableField = props => {
  const { field, fieldType, onChange } = props;
  const { handleChange, handleSelectable } = useHandleChange({
    field,
    onChange,
  });

  return (
    <>
      <Col span={"auto"} order={1}>
        <Radio
          name="fieldType"
          id="selectable_field"
          value="selectable"
          onChange={handleChange}
          checked={fieldType === "selectable" ? true : false}>
          Selectable Field{" "}
          <Icon
            path={mdiSelectPlace}
            title="Selectable Field"
            size={1}
            color="#07689F"
          />
        </Radio>
      </Col>
      {fieldType === "selectable" ? (
        <Col span={24} order={24}>
          <SelectableChoice
            field={field}
            fieldType={fieldType}
            handleChange={handleChange}
            handleSelectable={handleSelectable}
          />
        </Col>
      ) : null}
    </>
  );
};
export default SelectableField;
