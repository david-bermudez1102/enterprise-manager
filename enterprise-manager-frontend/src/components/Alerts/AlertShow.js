import React from "react";
import cuid from "cuid";

const AlertShow = ({ messages, className, style, handleClose }) => {
  const newClassName = `alert shadow d-flex align-items-center justify-content-between fixed-top w-100 text-white text-center ${className}`;
  const newStyle = {
    zIndex: 3000,
    borderRadius: 0,
    ...style
  };
  return (
    <div className={newClassName} style={newStyle}>
      <ul className="list-group bg-transparent mb-0 justify-content-center flex-fill p-0">
        {messages.map(message => (
          <li
            className="list-group-item bg-transparent p-0 border-0"
            key={cuid()}>
            {message}
          </li>
        ))}
      </ul>
      <button
        type="button"
        className="close"
        style={{ color: "inherit" }}
        onClick={handleClose}>
        &times;
      </button>
    </div>
  );
};

export default AlertShow;
