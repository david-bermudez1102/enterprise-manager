import React from "react";
import "./styles.css";
const IconWrapper = ({ title, size, style, children, onClick }) => {
  const className = "icon-wrapper rounded-circle shadow text-light d-flex align-items-center justify-content-center";
  return (
    <div
      onClick={onClick}
      title={title}
      className={className}
      style={{
        width: size,
        height: size,
        fontSize: "12px",
        ...style
      }}>
      {children}
    </div>
  );
};

export default IconWrapper;
