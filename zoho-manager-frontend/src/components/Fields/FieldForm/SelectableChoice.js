import React, { Component } from "react";
import SelectableResources from "./SelectableResources";
import SelectableOptions from "./SelectableOptions";

class SelectableChoice extends Component {
  constructor() {
    super();
    this.state = { choice: "" };
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { fieldType, handleSelectableChange } = this.props;
    return (
      <>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            name="choice"
            value="connect"
            onChange={this.handleChange}
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
          />
          <label htmlFor="selectable_field" className="form-check-label">
            Add Items Individually
          </label>
        </div>
        {this.state.choice === "connect" ? (
          <SelectableResources
            handleSelectableChange={handleSelectableChange}
          />
        ) : null}
        {this.state.choice === "items" ? (
          <SelectableOptions
            fieldType={fieldType}
            handleSelectableChange={handleSelectableChange}
          />
        ) : null}
      </>
    );
  }
}

export default SelectableChoice;
