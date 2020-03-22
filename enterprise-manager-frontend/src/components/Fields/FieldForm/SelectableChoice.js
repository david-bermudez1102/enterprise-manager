import React, { Component } from "react";
import SelectableResources from "./SelectableResources";
import SelectableOptions from "./SelectableOptions";

class SelectableChoice extends Component {
  constructor(props) {
    super(props);
    const { field } = props;
    const choice = field
      ? field.selectableResource.options.length > 0
        ? "connect"
        : "items"
      : null;
    this.state = { choice: field ? choice : "" };
  }

  handleChange = event => {
    const { selectableResourceAttributes, handleSelectableChange } = this.props;
    this.setState({ [event.target.name]: event.target.value }, () =>
      handleSelectableChange(
        this.state.choice !== "connect"
          ? {
              ...selectableResourceAttributes,
              _destroy: 1
            }
          : {
              form_id: selectableResourceAttributes.form_id,
              resource_field_id: selectableResourceAttributes.resource_field_id
            },
        []
      )
    );
  };

  render() {
    const {
      field,
      fieldType,
      handleSelectableChange,
      selectableResourceAttributes
    } = this.props;
    return (
      <div className="form-group mb-0">
        <hr />
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            name="choice"
            value="connect"
            onChange={this.handleChange}
            checked={this.state.choice === "connect" ? true : false}
          />
          <label htmlFor="selectable_field" className="form-check-label">
            Connect to a Resource
          </label>
        </div>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            name="choice"
            value="items"
            onChange={this.handleChange}
            defaultChecked={this.state.choice === "items" ? true : false}
          />
          <label htmlFor="selectable_field" className="form-check-label">
            Add Items Individually
          </label>
        </div>
        {this.state.choice === "connect" ? (
          <SelectableResources
            field={field}
            handleSelectableChange={handleSelectableChange}
            selectableResourceAttributes={selectableResourceAttributes}
          />
        ) : null}
        {this.state.choice === "items" ? (
          <SelectableOptions
            field={field}
            fieldType={fieldType}
            handleSelectableChange={handleSelectableChange}
            selectableResourceAttributes={selectableResourceAttributes}
          />
        ) : null}
      </div>
    );
  }
}

export default SelectableChoice;
