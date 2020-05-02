import React from "react";
const ToggleButton = ({ toggle, minimized }) => {
  return (
    <button
      className="btn btn-transparent btn-lg text-light shadow-none"
      onClick={toggle}>
      <i
        className={
          minimized
            ? "fad fa-chevron-circle-right display-4"
            : "fad fa-chevron-circle-left display-4"
        }
        style={{ fontSize: "30px" }}></i>
    </button>
  );
};

export default ToggleButton;
