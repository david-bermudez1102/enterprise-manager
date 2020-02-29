import React, { Component } from "react";
import cuid from "cuid";

class SelectableOptions extends Component {
  constructor() {
    super();
    this.state = {
      itemValue: "",
      options: []
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
        options: [...this.state.options, { value: this.state.itemValue }]
      },
      () =>
        this.props.handleSelectableChange(
          { form_id: "", resource_field_id: "" },
          this.state.options
        )
    );
  };

  render() {
    const { fieldType } = this.props;
    return (
      <div>
        {this.state.options.map(option => (
          <input type="text" value={option.value} readOnly={true} key={cuid()} />
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
