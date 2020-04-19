import React, { Component } from "react";
import cuid from "cuid";
import Options from "../Options/Options";
import SelectableInput from "./SelectableInput";

class Field extends Component {
  constructor() {
    super();
    this.state = { id: "", value: "", checked: {} };
  }

  handleChange = event => {
    event.persist();
    let option;
    if (event.target.checked) option = event.target;

    const optionDataSet = option ? option.dataset : null;
    this.setState({
      recordValueId: optionDataSet
        ? optionDataSet.recordValueId
        : event.target.dataset.recordValueId,
      optionValueId: optionDataSet
        ? optionDataSet.optionValueId
        : event.target.dataset.optionValueId,
      checked: {
        ...this.state.checked,
        [event.target.id]: event.target.checked
      },
      value: event.target.value
    });
  };

  handleSelectableChange = option => {
    const { field } = this.props;
    if (field.selectableResource)
      this.setState({
        recordValueId: option.id,
        value: option.value
      });
    else
      this.setState({
        recordOptionId: option.id,
        value: option.value
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
          <SelectableInput
            name={recordField.id}
            id={field.fieldAlias}
            className="form-control rounded-pill"
            placeholder={`Enter ${field.name}`}
            onChange={this.handleSelectableChange}
            fieldRef={fieldRef}
            required
            options={
              field.selectableResource
                ? field.selectableResource.options
                : field.options
            }>
            <label
              htmlFor={field.fieldAlias}
              className={"form-control-placeholder"}>
              {this.fieldName()}
            </label>
          </SelectableInput>
        );
        break;
      case "textarea":
        inputField = (
          <textarea
            className="form-control rounded-pill"
            type={field.fieldType}
            name={recordField.id}
            id={field.fieldAlias}
            placeholder={`Enter ${this.fieldName()}`}
            onChange={this.handleChange}
            value={this.state.value}
            ref={fieldRef}
            required
          />
        );
        break;
      case "date_field":
        inputField = (
          <input
            className="form-control rounded-pill"
            type={"date"}
            name={recordField.id}
            id={field.fieldAlias}
            placeholder={`Enter ${this.fieldName()}`}
            onChange={this.handleChange}
            value={this.state.value}
            ref={fieldRef}
          />
        );
        break;
      case "key_field":
        break;
      case "radio":
        inputField = (
          <fieldset ref={fieldRef}>
            {field.options.map(option => (
              <div className="form-check form-check-inline" key={cuid()}>
                <input
                  className="form-check-input"
                  type={field.fieldType}
                  name={recordField.id}
                  id={`radio_field_${option.id}`}
                  onChange={this.handleChange}
                  value={option.value}
                  checked={this.state.value === option.value}
                  data-option-value-id={option.id}
                />
                <label
                  htmlFor={`radio_field_${option.id}`}
                  className="form-check-label order-first">
                  {option.value}
                </label>
              </div>
            ))}
          </fieldset>
        );
        break;
      case "checkbox":
        inputField = (
          <fieldset ref={fieldRef} className="form-control border-0 mt-4">
            {field.options.map(option => (
              <div className="form-check form-check-inline" key={cuid()}>
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
              </div>
            ))}
          </fieldset>
        );
        break;
      default:
        inputField = (
          <input
            className="form-control rounded-pill"
            type={field.fieldType}
            name={recordField.id}
            id={field.fieldAlias}
            placeholder={`Enter ${this.fieldName()}`}
            onChange={this.handleChange}
            value={this.state.value}
            ref={fieldRef}
            required
          />
        );
        break;
    }
    const isLabelable =
      field.fieldType !== "text" &&
      field.fieldType !== "selectable" &&
      field.fieldType !== "textarea" &&
      field.fieldType !== "date_field"; // Used to check if label should be inside field.
    return (
      <>
        {/*field.fieldType !== "key_field" ? (
          <Options
            url={`${match.url}/fields`}
            content={field}
            deletionMessage="The field will be deleted from the resource."
          />
        ) : null*/}
        <div className={isLabelable ? "form-group mb-0" : "form-group"}>
          {inputField}
          {field.fieldType !== "selectable" ? (
            <label
              htmlFor={field.fieldAlias}
              className={isLabelable ? "ml-1" : "form-control-placeholder"}
              style={
                isLabelable
                  ? {
                      fontSize: "16px",
                      marginTop: "-55px",
                      position: "absolute"
                    }
                  : undefined
              }>
              {this.fieldName()}
            </label>
          ) : null}
        </div>
      </>
    );
  }
}

export default Field;
