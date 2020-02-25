import React from "react";

const Field = ({ field }) => {
  return <div><input type={field.fieldType} name={field.name} placeholder={`Enter ${field.name}`}/></div>
};

export default Field;
