import React, { Component } from "react";
import cuid from "cuid";
import Options from "../Options/Options";
import SelectableInput from "./SelectableInput";

const { formControl } = {
  formControl: "form-control rounded-pill"
};
class Field extends Component {
  constructor() {
    super();
    this.state = { id: "", value: "", checked: {}, showOptions: true };
  }

  componentDidUpdate() {}

  handleChange = event => {
    event.persist();
    let option;
    if (event.target.checked) option = event.target;

    const optionDataSet = option ? option.dataset : null;
    this.setState({
      recordValueId: optionDataSet ? optionDataSet.recordValueId : undefined,
      optionValueId: optionDataSet ? optionDataSet.optionValueId : undefined,
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
    const inputAttributes = {
      className: formControl,
      name: recordField.id,
      id: field.fieldAlias,
      type: field.fieldType,
      placeholder: `Enter ${this.fieldName()}`,
      onChange: this.handleChange,
      value: this.state.value,
      ref: fieldRef,
      required: true
    };
    switch (field.fieldType) {
      case "selectable":
        inputField = (
          <SelectableInput
            {...inputAttributes}
            ref={undefined}
            fieldRef={fieldRef}
            onChange={this.handleSelectableChange}
            options={
              field.selectableResource
                ? field.selectableResource.options
                : field.options
            }
            value={undefined}>
            <label
              htmlFor={field.fieldAlias}
              className={"form-control-placeholder"}>
              {this.fieldName()}
            </label>
          </SelectableInput>
        );
        break;
      case "textarea":
        inputField = <textarea {...inputAttributes} />;
        break;
      case "numeric_field":
        inputField = (
          <input
            {...inputAttributes}
            type="number"
            step={field.acceptsDecimals ? "any" : undefined}
            onInvalid={e => (e.target.value = "")}
            onBlur={e => e.target.checkValidity()}
          />
        );
        break;
      case "date_field":
        inputField = (
          <input {...inputAttributes} type={"date"} required={false} />
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
                  {...inputAttributes}
                  className="form-check-input"
                  id={`radio_field_${option.id}`}
                  value={option.value}
                  checked={this.state.value === option.value}
                  data-option-value-id={option.id}
                  ref={undefined}
                  required={false}
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
                  {...inputAttributes}
                  className="form-check-input"
                  id={`checkbox_field_${option.id}`}
                  value={option.value}
                  checked={this.state.checked[`checkbox_field_${option.id}`]}
                  data-option-value-id={option.id}
                  ref={undefined}
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
        break;
      default:
        inputField = <input {...inputAttributes} value={this.state.value} />;
        break;
    }
    const isLabelable =
      field.fieldType !== "text" &&
      field.fieldType !== "selectable" &&
      field.fieldType !== "textarea" &&
      field.fieldType !== "date_field" &&
      field.fieldType !== "numeric_field"; // Used to check if label should be inside field.
    return (
      <>
        {field.fieldType !== "key_field" ? (
          <Options
            url={`${match.url}/fields`}
            content={field}
            deletionMessage="The field will be deleted from the resource."
            style={{ marginTop: "-15px" }}
          />
        ) : null}
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
