import React from "react";
import { Radio, Col } from "antd";
import Icon from "@mdi/react";

const RadioWrapper = props => {
  const {
    id,
    name,
    value,
    children,
    onChange,
    iconPath,
    iconTitle,
    fieldType,
  } = props;
  return (
    <Col xl={8} lg={12} md={12} span={24} order={1}>
      <Radio.Button
        style={{ width: "100%" }}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        checked={fieldType === value ? true : false}>
        <span
          style={{
            display: "flex",
            alignItems: "center",
            height: "100%",
          }}>
          <Icon
            path={iconPath}
            title={iconTitle}
            size={0.6}
            style={{ marginRight: "5px" }}
          />{" "}
          {children}
        </span>
      </Radio.Button>
    </Col>
  );
};

export default RadioWrapper;
