import React from "react";

const Field = ({ field }) => {
  return <div><input type={field.fieldType} name={field.name}/></div>
};

export default Field;
