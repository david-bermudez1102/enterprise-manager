import React, { useState } from "react";
import cuid from "cuid";

const RadioField = props => {
  const { field, onChange, ...newProps } = props;
  const [state, setState] = useState({
    recordFieldId: props.name,
    content: ""
  });
  const handleChange = e => {
    const newState = {
      ...state,
      content: e.target.value,
      optionValueId: e.target.dataset.optionValueId
    };
    setState(newState);
    onChange(newState);
  };

  return (
    <fieldset className="form-control border-0 mt-4">
      {field.optionsAttributes.map(option => (
        <div className="form-check form-check-inline" key={cuid()}>
          <input
            {...newProps}
            className="form-check-input"
            id={`radio_field_${option.id}`}
            value={option.value}
            checked={state.content === option.value}
            onChange={handleChange}
            data-option-value-id={option.id}
            required={false}
          />
          <label
            htmlFor={`radio_field_${option.id}`}
            className="form-check-label">
            {option.value}
          </label>
        </div>
      ))}
    </fieldset>
  );
};

export default RadioField;
