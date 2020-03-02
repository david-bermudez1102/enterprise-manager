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
    event.persist();
    event.preventDefault();
    this.setState(
      {
        ...this.state,
        itemValue: "",
        options_attributes: [
          ...this.state.options_attributes,
          { value: this.state.itemValue }
        ]
      },
      () =>
        this.props.handleSelectableChange(
          { form_id: "", resource_field_id: "", _destroy:1 },
          this.state.options_attributes
        )
    );
    event.target.focus()
  };

  render() {
    const { fieldType } = this.props;
    const { options_attributes, itemValue } = this.state;
    return (
      <div>
        {options_attributes.map(option => (
          <div className="form-group" key={cuid()}>
            <input type="text" value={option.value} readOnly={true} />
          </div>
        ))}
        Add items to {fieldType} field:
        <div className="form-group">
          <input
            type="text"
            name="itemValue"
            onChange={this.handleChange}
            className="form-control"
            value={itemValue}
            autoFocus={true}
          />
        </div>
        <button onClick={this.handleClick} className="btn btn-primary shadow">
          {options_attributes.length === 0 ? "Add Item" : "Add Another Item"}
        </button>
      </div>
    );
  }
}

export default SelectableOptions;
