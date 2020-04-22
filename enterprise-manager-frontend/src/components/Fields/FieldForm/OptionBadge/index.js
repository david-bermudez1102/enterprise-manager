import React from "react";

const OptionBadge = ({ value, onClick }) => {
  return (
    <span
      className="badge badge-primary badge-pill mr-2"
      style={{ minWidth: "100px" }}>
      <span className="float-left h-100">{value}</span>

      <i
        className="fas fa-minus-square pl-2 float-right"
        style={{ cursor: "pointer" }}
        title="Remove Item"
        onClick={onClick}></i>
    </span>
  );
};
export default OptionBadge;
