import React from "react";
import { connect } from "react-redux";
import cuid from "cuid";
import { useHandleChange } from "../../Hooks/useHandleChange";
import { Col, Form, Input, Radio, Select, Divider } from "antd";

const RecordKeyField = props => {
  const { field, fieldType, resourceId, onChange } = props;
  const { handleChange, handleKeyFieldChange, state } = useHandleChange({
    field,
    onChange,
  });
  const { recordKeyAttributes } = state;

  const fields = props.fields.filter(
    f => f.formId === resourceId && f.fieldType === "selectable"
  );

  return (
    <>
      <Col span={"auto"} order={1}>
        <Radio
          name="fieldType"
          value="key_field"
          onChange={handleChange}
          checked={fieldType === "key_field" ? true : false}>
          Key Field
        </Radio>
      </Col>
      {fieldType === "key_field" ? (
        <Col span={24} order={24}>
          <Divider />
          <Form.Item
            name="resourceFieldId"
            onChange={handleKeyFieldChange}
            label="Grouped by">
            <Select
              value={
                recordKeyAttributes ? recordKeyAttributes.resourceFieldId : ""
              }
              className="form-control">
              <Select.Option value="">Select a field</Select.Option>
              {fields.map(field => (
                <Select.Option key={cuid()} value={field.id}>
                  {field.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <p
            className="small text-muted text-justify"
            style={{ lineHeight: "16px" }}>
            The key field won't be visible in the form. It will be assigned
            automatically whenever a new record is submitted.
          </p>
        </Col>
      ) : null}
    </>
  );
};

const mapStateToProps = ({ fields }) => {
  return { fields };
};

export default connect(mapStateToProps)(RecordKeyField);
