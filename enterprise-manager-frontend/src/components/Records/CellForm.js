import React, { useState } from "react";
import { Form, Input, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import "./styles.css";
export const CellForm = props => {
  const { content, formId, recordId, recordFieldId, organizationId } = props;
  const [state, setState] = useState({
    content: content ? content : "",
    formId,
    recordId,
    recordFieldId,
    organizationId,
  });
  const [loading, setLoading] = useState(false);
  const suffix = loading ? (
    <Spin
      indicator={<LoadingOutlined style={{ fontSize: 14 }} spin />}
      style={{ marginRight: "5px" }}
    />
  ) : (
    <span style={{ display: "none" }} />
  );

  const handleChange = e => {
    setState({ ...state, content: e.target.value });
  };

  const handleBlur = () => {
    props.handleBlur();
    setLoading(false);
  };

  const handleSubmit = () => {
    setLoading(true);
    const { addValue, updateRecord } = props;
    if (!content) addValue(state);
    else if (content !== state.content) updateRecord(state);
  };

  return (
    <Form
      onSubmit={handleSubmit}
      initialValues={{ content: state.content }}
      style={{ padding: 0, margin: 0 }}>
      <Form.Item name="content" noStyle>
        <Input
          type="text"
          style={{
            border: 0,
            outline: 0,
            padding: 0,
            margin: 0,
          }}
          onChange={handleChange}
          onBlur={handleBlur}
          onPressEnter={handleSubmit}
          suffix={suffix}
          autoFocus
        />
      </Form.Item>
    </Form>
  );
};

export default CellForm;
