import React, { useState } from "react";
import cuid from "cuid";

const CheckboxField = props => {
  const { field, onChange, ...newProps } = props;
  const [state, setState] = useState({
    recordFieldId: props.name,
    content: "",
    checkboxOptionsAttributes: []
  });
  const [values, setValues] = useState([]);
  const [checked, setChecked] = useState({});

  const handleChange = e => {
    const newValues = e.target.checked
      ? [
          ...values.filter(v => v.id !== e.target.id),
          { id: e.target.id, value: e.target.value }
        ]
      : values.filter(v => v.id !== e.target.id);
    const newState = {
      ...state,
      content: newValues.map(v => v.value).join(", "),
      checkboxOptionsAttributes: e.target.checked
        ? [
            ...state.checkboxOptionsAttributes.filter(
              o => o.option_id !== e.target.dataset.optionValueId
            ),
            { option_id: e.target.dataset.optionValueId }
          ]
        : state.checkboxOptionsAttributes.filter(
            o => o.option_id !== e.target.dataset.optionValueId
          )
    };
    setChecked({ [e.target.id]: e.target.checked });
    setValues(newValues);
    setState(newState);
    onChange(newState);
  };

  return (
    <fieldset className="form-control border-0 mt-4">
      {field.options.map(option => (
        <div className="form-check form-check-inline" key={cuid()}>
          <input
            {...newProps}
            className="form-check-input"
            id={`checkbox_field_${option.id}`}
            value={option.value}
            onChange={handleChange}
            checked={checked[`checkbox_field_${option.id}`]}
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

export default CheckboxField;
