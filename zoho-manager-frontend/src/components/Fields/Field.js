import React from "react";

const Field = ({ field }) => {
  return <div><input type={field.field_type} name={field.name}/></div>
};

export default Field;
