import React, { useState, useEffect, useRef } from "react";

import { useDispatch } from "react-redux";
import RecordKeyField from "./RecordKeyField";
import TextField from "./TextField";
import NumericField from "./NumericField";
import TextareaField from "./TextareaField";
import PasswordField from "./PasswordField";
import SelectableField from "./SelectableField";
import RadioField from "./RadioField";
import CheckBoxField from "./CheckBoxField";
import DateField from "./DateField";
import CombinedField from "./CombinedField";
import { Form, Input, Button, Radio, Row, Checkbox, Divider } from "antd";
import { AppstoreTwoTone } from "@ant-design/icons";

const FieldForm = props => {
  const { organizationId, action, resourceId } = props;
  const { key, fieldAlias, name, formId, isRequired, ...field } = props.field;
  const [fieldState, setFieldState] = useState(field || {});
  const mounted = useRef();

  const dispatch = useDispatch();
  const initalState = {
    name: name || "",
    formId: formId || resourceId,
    isRequired: isRequired || false,
  };

  const [state, setState] = useState(initalState);

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
    } else {
      setFieldState(field || {});
      setState(initalState);
    }
    // eslint-disable-next-line
  }, [props.match]);

  const onChange = state => {
    setFieldState(state);
  };

  const handleSubmit = e => {
    const { addField, updateField, addRecordField, updateRecordField } = props;
    if (addField) {
      dispatch(addField({ ...state, ...fieldState }, organizationId)).then(
        field => {
          setState(initalState);
          setFieldState({});
          return field ? dispatch(addRecordField(field, organizationId)) : null;
        }
      );
    }
    if (updateField)
      dispatch(
        updateField({ ...state, ...fieldState }, organizationId, field.id)
      ).then(field =>
        field
          ? dispatch(
              updateRecordField(field, organizationId, field.recordFieldId)
            )
          : null
      );
  };

  const fieldProps = {
    field,
    fieldType: fieldState.fieldType || "",
    onChange,
  };

  return (
    <Form
      name="new_resource"
      onFinish={handleSubmit}
      layout={"vertical"}
      initialValues={initalState}>
      <Form.Item
        name="name"
        id="field_name"
        label="Field Name"
        onChange={e =>
          setState({
            ...state,
            name: e.target.value,
          })
        }
        rules={[
          {
            required: true,
            message: "Please enter a valid field name!",
          },
        ]}>
        <Input
          size="large"
          prefix={<AppstoreTwoTone />}
          placeholder="Enter field name..."
        />
      </Form.Item>
      <Divider />
      <Form.Item label="Field Type:">
        <Row>
          <RecordKeyField resourceId={resourceId} {...fieldProps} />
          <TextField {...fieldProps} />
          <NumericField {...fieldProps} />
          <TextareaField {...fieldProps} />
          <PasswordField {...fieldProps} />
          <SelectableField {...fieldProps} />
          <RadioField {...fieldProps} />
          <CheckBoxField {...fieldProps} />
          <DateField {...fieldProps} />
          <CombinedField {...fieldProps} resourceId={resourceId} />
        </Row>
      </Form.Item>
      <Divider />
      <Form.Item>
        <Checkbox
          name="isRequired"
          onChange={e =>
            setState({ ...state, isRequired: e.target.checked ? true : false })
          }
          checked={state.isRequired}>
          Required
        </Checkbox>
      </Form.Item>
      <Divider />
      <Form.Item>
        <Button type="primary" htmlType="submit">
          {action}
        </Button>
      </Form.Item>
    </Form>
  );
};
export default FieldForm;
