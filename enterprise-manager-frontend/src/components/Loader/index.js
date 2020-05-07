import React, { useState } from "react";
import "./styles.scss";
import cuid from "cuid";
import BarLoader from "react-spinners/BarLoader";

const Loader = props => {
  const [key, setKey] = useState(cuid());
  //if (!requesting) return null;
  return (
    <div
      className="d-flex w-100 position-absolute justify-content-center"
      style={{ top: 1, left: 0, zIndex: 2, opacity: 0.5 }}>
      <BarLoader color={"#ccc"} {...props} width={"100%"} />
    </div>
  );
};

export default Loader;
