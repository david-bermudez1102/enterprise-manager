import React, { Component } from "react";
import SelectableResources from "./SelectableResources";
import SelectableOptions from "./SelectableOptions";

class SelectableChoice extends Component {
  constructor(props) {
    super(props);
    const { field } = props;
    const choice =
      field.selectableResource.options.length > 0 ? "connect" : "items";
    this.state = { choice: field ? choice : "" };
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
    this.props.handleSelectableChange(
      {
        selectable_resource_attributes: {
          form_id: "",
          resource_field_id: "",
          _destroy: 1
        }
      },
      []
    );
  };

  render() {
    const { field, fieldType, handleSelectableChange } = this.props;
    return (
      <div className="form-group">
        <hr />
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            name="choice"
            value="connect"
            onChange={this.handleChange}
            defaultChecked={this.state.choice === "connect" ? true : false}
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
          />
        ) : null}
        {this.state.choice === "items" ? (
          <SelectableOptions
            field={field}
            fieldType={fieldType}
            handleSelectableChange={handleSelectableChange}
          />
        ) : null}
      </div>
    );
  }
}

export default SelectableChoice;
