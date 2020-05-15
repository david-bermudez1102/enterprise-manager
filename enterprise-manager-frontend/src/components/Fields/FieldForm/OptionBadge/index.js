import React from "react";
import { Tag } from "antd";

const OptionBadge = props => {
  const { value, handleClose, onDragEnter, style, ...newProps } = props;
  return (
    <Tag
      draggable
      closable
      onClose={handleClose}
      style={{
        cursor: "move",
        userSelect: "none",
        ...style,
      }}
      {...newProps}>
      <span onDragEnter={onDragEnter}>{value}</span>
    </Tag>
  );
};
export default OptionBadge;
