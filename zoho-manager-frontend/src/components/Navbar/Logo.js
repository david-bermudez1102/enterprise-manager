import React from "react";

const Logo = ({organization}) => {
  return (
    <img
      src={`http://localhost:3001/${organization.logo}`}
      style={{ maxWidth: "180px" }}
    />
  );
}

export default Logo;