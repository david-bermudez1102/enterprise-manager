import React, { Component } from "react";
import cuid from "cuid";
import Options from "../Options/Options";

class Field extends Component {
  constructor() {
    super();
    this.state = { id: "", value: "" };
  }

  handleChange = event => {
    event.persist();
    const option = event.target.options
      ? event.target.options[event.target.selectedIndex]
      : null;
    const optionDataSet = option ? option.dataset : null;
    this.setState({
      recordValueId: optionDataSet ? optionDataSet.recordValueId : null,
      optionValueId: optionDataSet ? optionDataSet.optionValueId : null,
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
    return (
      <div className="form-group">
        <Options url={`${match.url}/fields`} content={field} />
        {field.fieldType !== "selectable" ? (
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
        ) : (
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
        )}
      </div>
    );
  }
}

export default Field;
