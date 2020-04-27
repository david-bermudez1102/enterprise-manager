import React, { useState, useEffect, useRef } from "react";
import cuid from "cuid";

const SelectableResourcesOptions = props => {
  const { fields, selected, resourceFieldId } = props;

  const mounted = useRef();

  const [state, setState] = useState({ value: resourceFieldId });

  const handleChange = e => {
    e.persist();
    setState({ value: [e.target.value] });
    props.handleChange(e);
  };

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
    } else {
      setState({ value: "" });
    }
  }, [selected]);

  return fields.some(field => field.formId === parseInt(selected)) ? (
    <div className="form-group">
      <hr />
      <label htmlFor="selectable_resource_options">Column:</label>

      <select
        name="resourceFieldId"
        onChange={handleChange}
        value={state.value}
        className="form-control"
        id="selectable_resource_options">
        <option value="" key={cuid()}>
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
    </div>
  ) : null;
};

export default SelectableResourcesOptions;
