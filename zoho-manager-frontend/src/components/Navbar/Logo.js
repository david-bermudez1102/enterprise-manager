import React from "react";

const Logo = ({organization}) => {
  return (
    <img
      src={`http://localhost:3001/${organization.logo}`}
      style={{ maxWidth: "150px" }}
      alt={organization.name}
    />
  );
}

export default Logo;