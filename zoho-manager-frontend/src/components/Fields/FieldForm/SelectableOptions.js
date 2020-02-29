import React, { Component } from "react";
import cuid from "cuid";

class SelectableOptions extends Component {
  constructor() {
    super();
    this.state = {
      itemValue: "",
      options_attributes: []
    };
  }

  handleChange = event => {
    this.setState({
      ...this.state,
      [event.target.name]: event.target.value
    });
  };

  handleClick = event => {
    event.preventDefault();
    this.setState(
      {
        ...this.state,
        options_attributes: [
          ...this.state.options_attributes,
          { value: this.state.itemValue }
        ]
      },
      () =>
        this.props.handleSelectableChange(
          { form_id: "", resource_field_id: "" },
          this.state.options_attributes
        )
    );
  };

  render() {
    const { fieldType } = this.props;
    return (
      <div>
        {this.state.options_attributes.map(option => (
          <input
            type="text"
            value={option.value}
            readOnly={true}
            key={cuid()}
          />
        ))}
        Add items to {fieldType} field:
        <input
          type="text"
          name="itemValue"
          onChange={this.handleChange}
          value={this.itemValue}
        />
        <button onClick={this.handleClick}>Add another Item</button>
      </div>
    );
  }
}

export default SelectableOptions;
