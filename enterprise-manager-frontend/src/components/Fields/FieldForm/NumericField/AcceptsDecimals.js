import React from "react";
import { useState } from "react";
import { Col, Checkbox } from "antd";

const AcceptsDecimals = ({ handleChange, fieldType, field }) => {
  const [acceptsDecimals, setAcceptsDecimals] = useState(field.acceptsDecimals);

  const handleCheckBoxChange = e => {
    setAcceptsDecimals(e.target.checked);
    handleChange({ acceptsDecimals: e.target.checked });
  };

  return fieldType === "numeric_field" ? (
    <Col span={24} order={24}>
      <hr />
      <Checkbox
        name="acceptsDecimals"
        onChange={handleCheckBoxChange}
        checked={acceptsDecimals}>
        Accepts Decimals
      </Checkbox>
    </Col>
  ) : null;
};
export default AcceptsDecimals;
