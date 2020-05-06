import React from "react";
import "./styles.scss";
const Loader = ({ requesting }) => {
  if (!requesting) return null;
  return <div className="loader">Loading...</div>;
};

export default Loader;
