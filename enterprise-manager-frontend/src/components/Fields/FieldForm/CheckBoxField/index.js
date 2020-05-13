import React from "react";
import { connect } from "react-redux";
import Icon from "@mdi/react";
import { mdiCheckboxMultipleMarkedOutline } from "@mdi/js";
import SelectableOptions from "../SelectableField/SelectableOptions";
import { useHandleChange } from "../../Hooks/useHandleChange";
import { Radio, Col } from "antd";

const CheckBoxField = props => {
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
          id="checkbox_field"
          value="checkbox"
          onChange={handleChange}
          checked={fieldType === "checkbox" ? true : false}>
          Checkbox Set{" "}
          <Icon
            path={mdiCheckboxMultipleMarkedOutline}
            title="Checkbox Field"
            size={1}
            color="#07689F"
          />
        </Radio>
      </Col>
      {fieldType === "checkbox" ? (
        <Col span={24} order={24}>
          <SelectableOptions
            field={field}
            fieldType={fieldType}
            handleSelectable={handleSelectable}
            handleChange={handleChange}
          />
        </Col>
      ) : null}
    </>
  );
};
const mapStateToProps = ({ fields }) => {
  return { fields };
};

export default connect(mapStateToProps)(CheckBoxField);
