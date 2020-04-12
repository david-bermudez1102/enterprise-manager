import React from "react";
import "./styles.css";
const Logo = ({ organization, width, height }) => {
  return (
    <div className="logo bg-transparent text-center m-0 p-0" style={{ width, height }}>
      <div className="w-100 h-100 position-relative p-0 m-0">
        <img src={`http://localhost:3001/${organization.logo.url}`} alt={organization.name} />
      </div>
    </div>
  );
};

export default Logo;
