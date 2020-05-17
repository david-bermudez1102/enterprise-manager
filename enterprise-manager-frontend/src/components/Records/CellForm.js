import React, { useState } from "react";
import { Form, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import "./styles.scss";
import { useSelector, shallowEqual } from "react-redux";
import Field from "../Fields/FieldsList/Field";
import useMatchedRoute from "../NoMatch/useMatchedRoute";
export const CellForm = props => {
  const { content, formId, recordId, recordFieldId, organizationId } = props;
  const match = useMatchedRoute();
  const { fields, recordFields } = useSelector(
    ({ fields, recordFields }) => ({ fields, recordFields }),
    shallowEqual
  );
  const field = fields.find(f => f.recordFieldId === recordFieldId);
  const [state, setState] = useState({
    content: content ? content : "",
    formId,
    recordId,
    recordFieldId,
    organizationId,
  });
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const suffix = loading ? (
    <Spin
      indicator={<LoadingOutlined style={{ fontSize: 14 }} spin />}
      style={{ marginRight: "5px" }}
    />
  ) : (
    <span style={{ display: "none" }} />
  );

  const handleChange = newState => {
    setLoading(false);
    setState({ ...state, ...newState });
  };

  const handleBlur = () => {
    props.handleBlur();
    setLoading(false);
  };

  const onFinish = data => {
    setLoading(true);
    const { addValue, updateRecord } = props;
    if (!content) addValue(state);
    else if (content !== state.content) updateRecord(state);
  };

  return (
    <Form
      form={form}
      size={"small"}
      onFinish={onFinish}
      initialValues={{ [recordFieldId]: state.content }}
      style={{ padding: 0, margin: 0 }}
      className="custom-form">
      <Field
        key={field.key}
        field={field}
        recordField={recordFields.find(f => f.id === recordFieldId)}
        fields={field.fieldType === "key_field" ? fields : undefined}
        state={
          field.fieldType === "combined_field" ||
          field.fieldType === "key_field"
            ? state
            : undefined
        }
        match={match}
        handleChange={handleChange}
        onBlur={handleBlur}
        editingMode={true}
        style={{
          border: 0,
          outline: 0,
          padding: 0,
          margin: 0,
        }}
        suffix={suffix}
        onPressEnter={field.fieldType === "textarea" ? onFinish : undefined}
        autoFocus
      />
    </Form>
  );
};

export default React.memo(CellForm);
