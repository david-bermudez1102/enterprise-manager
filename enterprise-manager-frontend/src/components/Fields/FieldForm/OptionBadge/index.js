import React from "react";

const OptionBadge = props => {
  const { value, handleClose, style, ...newProps } = props;
  return (
    <span
      className="badge badge-primary badge-pill mr-2"
      style={{
        minWidth: "100px",
        cursor: "move",
        userSelect: "none",
        ...style
      }}
      {...newProps}>
      <span className="float-left h-100">{value}</span>

      <i
        className="fas fa-minus-square pl-2 float-right"
        style={{ cursor: "pointer" }}
        title="Remove Item"
        onClick={handleClose}></i>
    </span>
  );
};
export default OptionBadge;
