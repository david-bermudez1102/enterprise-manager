import React, { Component } from "react";
import cuid from "cuid";

class SelectableOptions extends Component {
  constructor() {
    super();
    this.itemValue = React.createRef();
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
    const itemValue = this.itemValue.current;
    if (itemValue.value !== "")
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
    itemValue.focus();
  };

  removeItem = value => {
    const { selectableResourceAttributes, handleSelectableChange } = this.props;
    this.setState(
      {
        itemValue: "",
        options_attributes: [
          ...this.state.options_attributes.filter(
            option => option.value !== value
          )
        ]
      },
      () =>
        handleSelectableChange(
          {
            ...selectableResourceAttributes,
            _destroy: 1
          },
          this.state.options_attributes
        )
    );
  };

  render() {
    const { fieldType } = this.props;
    const { options_attributes, itemValue } = this.state;
    return (
      <div className="">
        <hr />
        <div className="display-4" style={{ fontSize: "20px" }}>
          {options_attributes.map(option => (
            <span
              key={cuid()}
              className="badge badge-primary badge-pill mr-2"
              style={{ minWidth: "100px" }}>
              <span className="float-left h-100">{option.value}</span>

              <i
                className="fas fa-minus-square pl-2 float-right"
                style={{ cursor: "pointer" }}
                title="Remove Item"
                onClick={() => this.removeItem(option.value)}></i>
            </span>
          ))}
        </div>
        <div className="form-group mt-3">
          <input
            type="text"
            name="itemValue"
            id="item_value"
            onChange={this.handleChange}
            className="form-control"
            value={itemValue}
            autoFocus={true}
            ref={this.itemValue}
          />
          <label className="form-control-placeholder" htmlFor="item_value">
            Add item to {fieldType} field
          </label>
        </div>
        <button onClick={this.handleClick} className="btn btn-secondary shadow">
          {options_attributes.length === 0 ? "Add Item" : "Add Another Item"}
        </button>
      </div>
    );
  }
}

export default SelectableOptions;
