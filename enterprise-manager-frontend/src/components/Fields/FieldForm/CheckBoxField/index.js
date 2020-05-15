import React from "react";
import { connect } from "react-redux";
import { mdiCheckboxMultipleMarkedOutline } from "@mdi/js";
import SelectableOptions from "../SelectableField/SelectableOptions";
import { useHandleChange } from "../../Hooks/useHandleChange";
import { Col } from "antd";
import RadioWrapper from "../RadioWrapper";

const CheckBoxField = props => {
  const { field, fieldType, onChange } = props;

  const { handleChange, handleSelectable } = useHandleChange({
    field,
    onChange,
  });

  return (
    <>
      <RadioWrapper
        name="fieldType"
        id="checkbox_field"
        value="checkbox"
        onChange={handleChange}
        iconPath={mdiCheckboxMultipleMarkedOutline}
        iconTitle={"Checkbox Field"}
        fieldType={fieldType}>
        Checkbox Field
      </RadioWrapper>
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
