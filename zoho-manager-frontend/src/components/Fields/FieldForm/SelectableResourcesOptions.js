import React from "react";
import cuid from "cuid";

const SelectableResourcesOptions = ({ fields, selected, handleChange }) => {
  return fields.some(field => field.formId === parseInt(selected)) ? (
    <select name="resource_field_id" onChange={handleChange}>
      <option value="0" key={cuid()}>
        Select
      </option>
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
