import React from "react";
import cuid from "cuid";

const SelectableResourcesOptions = ({ fields, selected }) => {
  return fields.some(field => field.formId === parseInt(selected)) ? (
    <select>
      {fields.map(field =>
        field.formId === parseInt(selected) ? (
          <option value={field.id} key={cuid()}>
            {field.name}
          </option>
        ) : null
      )}
    </select>
  ) : null;
};

export default SelectableResourcesOptions;
