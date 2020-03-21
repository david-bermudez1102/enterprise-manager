import React from "react";

const IconWrapper = ({ title, size, style, children }) => {
  const className =
    "rounded-circle shadow text-light d-flex align-items-center justify-content-center ";
  return (
    <div
      title={title}
      className={className}
      style={{
        width: size,
        height: size,
        background: "rgba(0,0,0,0.6)",
        fontSize: "12px",
        ...style
      }}>
      {children}
    </div>
  );
};

export default IconWrapper;
