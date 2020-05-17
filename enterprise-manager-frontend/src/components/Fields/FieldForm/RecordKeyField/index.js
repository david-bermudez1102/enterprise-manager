import React from "react";
import { connect } from "react-redux";
import cuid from "cuid";
import { useHandleChange } from "../../Hooks/useHandleChange";
import { Col, Form, Select, Divider } from "antd";
import { mdiKey } from "@mdi/js";
import RadioWrapper from "../RadioWrapper";

const RecordKeyField = props => {
  const { field, fieldType, resourceId, onChange } = props;
  const { handleChange, handleKeyFieldChange } = useHandleChange({
    field,
    onChange,
  });

  const fields = props.fields.filter(
    f => f.formId === resourceId && f.fieldType === "selectable"
  );

  return (
    <>
      <RadioWrapper
        name="fieldType"
        value="key_field"
        onChange={handleChange}
        iconPath={mdiKey}
        iconTitle={"Key Field"}
        fieldType={fieldType}>
        Key Field
      </RadioWrapper>

      {fieldType === "key_field" ? (
        <Col span={24} order={24}>
          <Divider />
          <Form.Item
            name="resourceFieldId"
            label="Grouped by"
            rules={[
              {
                required: true,
                message: "Please select a valid field!",
              },
            ]}
            extra={
              "The key field won't be visible in the form. It will be assigned automatically whenever a new record is submitted."
            }>
            <Select
              allowClear
              required
              showSearch
              placeholder="Select a field"
              onChange={handleKeyFieldChange}>
              {fields.map(field => (
                <Select.Option key={cuid()} value={field.id}>
                  {field.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
      ) : null}
    </>
  );
};

const mapStateToProps = ({ fields }) => ({ fields });

export default connect(mapStateToProps)(RecordKeyField);
