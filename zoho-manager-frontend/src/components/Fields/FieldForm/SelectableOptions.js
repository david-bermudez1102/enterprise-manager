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
    const { selectableResourceAttributes } = this.props;
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
          {
            ...selectableResourceAttributes,
            _destroy: 1
          },
          this.state.options_attributes
        )
    );
    event.target.focus();
  };

  render() {
    const { fieldType } = this.props;
    const { options_attributes, itemValue } = this.state;
    return (
      <div className="">
        <hr />
        <ul className="list-group list-group-flush">
          {options_attributes.map(option => (
            <li key={cuid()} className="list-group-item">
              {option.value}
            </li>
          ))}
        </ul>
        <div className="form-group">
          <label htmlFor="item_value">Add items to {fieldType} field:</label>
          <input
            type="text"
            name="itemValue"
            id="item_value"
            onChange={this.handleChange}
            className="form-control"
            value={itemValue}
            autoFocus={true}
          />
        </div>
        <button onClick={this.handleClick} className="btn btn-secondary shadow">
          {options_attributes.length === 0 ? "Add Item" : "Add Another Item"}
        </button>
      </div>
    );
  }
}

export default SelectableOptions;
