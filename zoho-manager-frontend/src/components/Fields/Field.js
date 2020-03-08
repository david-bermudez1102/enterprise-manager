import React, { Component } from "react";
import cuid from "cuid";
import Options from "../Options/Options";

class Field extends Component {
  constructor() {
    super();
    this.state = { id: "", value: "", checked: {}, checkedValues: {} };
  }

  handleChange = event => {
    event.persist();
    let option;
    if (event.target.options)
      option = event.target.options[event.target.selectedIndex];
    else if (event.target.checked) option = event.target;

    const optionDataSet = option ? option.dataset : null;
    this.setState({
      recordValueId: optionDataSet ? optionDataSet.recordValueId : null,
      optionValueId: optionDataSet ? optionDataSet.optionValueId : null,
      checked: {
        ...this.state.checked,
        [event.target.id]: event.target.checked
      },
      checkedValues: {
        ...this.state.checkedValues,
        [event.target.dataset.optionValueId]: event.target.checked
          ? event.target.value
          : undefined
      },
      value: event.target.value
    });
  };

  fieldName = () => {
    const { field } = this.props;
    return field.name
      .split("_")
      .map(word => word.charAt(0).toUpperCase() + word.substr(1).toLowerCase())
      .join(" ");
  };

  render() {
    const { match, field, recordField, fieldRef } = this.props;
    let inputField;
    switch (field.fieldType) {
      case "selectable":
        inputField = (
          <select
            className="form-control"
            name={recordField.id}
            id={field.name}
            placeholder={`Enter ${field.name}`}
            onChange={this.handleChange}
            value={this.state.value}
            data-record-value-id={this.state.recordValueId}
            data-option-value-id={this.state.optionValueId}
            ref={fieldRef}>
            {field.selectableResource
              ? field.selectableResource.options.map(option => (
                  <option
                    key={cuid()}
                    value={option.value}
                    data-record-value-id={option.id}>
                    {option.value}
                  </option>
                ))
              : field.options.map(option => (
                  <option
                    key={cuid()}
                    value={option.value}
                    data-option-value-id={option.id}>
                    {option.value}
                  </option>
                ))}
          </select>
        );
        break;
      case "key_field":
        break;
      case "radio":
        inputField = (
          <div className="form-check form-check-inline" ref={fieldRef}>
            {field.options.map(option => (
              <React.Fragment key={cuid()}>
                <input
                  className="form-check-input"
                  type={field.fieldType}
                  name={recordField.id}
                  id={`radio_field_${option.id}`}
                  onChange={this.handleChange}
                  value={option.value}
                  checked={this.state.checked[`radio_field_${option.id}`]}
                  data-option-value-id={option.id}
                />
                <label
                  htmlFor={`radio_field_${option.id}`}
                  className="form-check-label">
                  {option.value}
                </label>
              </React.Fragment>
            ))}
          </div>
        );
        break;
      case "checkbox":
        inputField = (
          <div className="form-check form-check-inline" ref={fieldRef}>
            {field.options.map(option => (
              <fieldset key={cuid()}>
                <input
                  className="form-check-input"
                  type={field.fieldType}
                  name={recordField.id}
                  id={`checkbox_field_${option.id}`}
                  onChange={this.handleChange}
                  value={option.value}
                  checked={this.state.checked[`checkbox_field_${option.id}`]}
                  data-option-value-id={option.id}
                />
                <label
                  htmlFor={`radio_field_${option.id}`}
                  className="form-check-label">
                  {option.value}
                </label>
              </fieldset>
            ))}
          </div>
        );
        break;
      default:
        inputField = (
          <input
            className="form-control"
            type={field.fieldType}
            name={recordField.id}
            id={field.name}
            placeholder={`Enter ${this.fieldName()}`}
            onChange={this.handleChange}
            value={this.state.value}
            ref={fieldRef}
          />
        );
        break;
    }
    console.log(this.state);
    return (
      <div className="form-group">
        <Options url={`${match.url}/fields`} content={field} />
        {inputField}
      </div>
    );
  }
}

export default Field;
