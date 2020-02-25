import React from "react";
import Field from "./Field";

const FieldsList = ({ fields }) => {
  return (
    <form>
      <div>
        {fields.map(field => (
          <Field field={field} />
        ))}
      </div>
    </form>
  );
};
export default FieldsList;
