import React from "react";
import { connect } from "react-redux";
import Icon from "@mdi/react";
import { mdiCheckboxMultipleMarkedCircleOutline } from "@mdi/js";
import SelectableOptions from "../SelectableField/SelectableOptions";
import { useHandleChange } from "../../Hooks/useHandleChange";
import { Radio, Col } from "antd";

const RadioField = props => {
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
          id="radio_field"
          value="radio"
          onChange={handleChange}
          checked={fieldType === "radio" ? true : false}>
          Radio Field
          <Icon
            path={mdiCheckboxMultipleMarkedCircleOutline}
            title="Radio Field"
            size={1}
            color="#07689F"
          />
        </Radio>
      </Col>
      {fieldType === "radio" ? (
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

export default connect(mapStateToProps)(RadioField);
