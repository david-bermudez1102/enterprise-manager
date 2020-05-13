import React from "react";
import "./styles.css";
import { NavLink } from "react-router-dom";
const Logo = ({ organization, width, height }) => {
  return (
    <div className="logo">
      <NavLink to="/">
        <img
          src={`http://localhost:3001/${organization.logo.url}`}
          alt={organization.name}
          width="100%"
        />
      </NavLink>
    </div>
  );
};

export default Logo;
