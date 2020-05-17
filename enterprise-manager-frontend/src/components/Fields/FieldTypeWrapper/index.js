import React from "react";
import { Form } from "antd";

const FieldTypeWrapper = ({ editingMode, label, name, field, children }) => {
  return (
    <Form.Item
      label={!editingMode ? label || field.name : "undefined"}
      name={name}
      rules={[
        {
          required: field.isRequired,
          message: `Please enter a valid ${field.name.toLowerCase()}`,
        },
      ]}
      noStyle={editingMode}>
      {children}
    </Form.Item>
  );
};
export default FieldTypeWrapper;
