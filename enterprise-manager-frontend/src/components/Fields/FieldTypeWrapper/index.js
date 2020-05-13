import React from "react";
import { Form } from "antd";

const FieldTypeWrapper = ({ name, field, children }) => {
  return (
    <Form.Item
      label={field.name}
      name={name}
      rules={[
        {
          required: field.isRequired,
          message: `Please enter a valid ${field.name.toLowerCase()}`,
        },
      ]}>
      {children}
    </Form.Item>
  );
};
export default FieldTypeWrapper;
