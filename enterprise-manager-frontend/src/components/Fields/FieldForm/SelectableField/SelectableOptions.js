import React, { Component } from "react";
import cuid from "cuid";

class SelectableOptions extends Component {
  constructor(props) {
    super(props);
    const { optionsAttributes } = props.field;
    this.itemValue = React.createRef();
    this.state = {
      itemValue: "",
      optionsAttributes: optionsAttributes || []
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
    const itemValue = this.itemValue.current;
    if (itemValue.value !== "")
      this.setState(
        {
          ...this.state,
          itemValue: "",
          optionsAttributes: [
            ...this.state.optionsAttributes,
            { value: this.state.itemValue }
          ]
        },
        () =>
          this.props.handleSelectable({
            optionsAttributes: this.state.optionsAttributes
          })
      );
    itemValue.focus();
  };

  removeItem = value => {
    const { handleSelectable } = this.props;
    this.setState(
      {
        itemValue: "",
        optionsAttributes: [
          ...this.state.optionsAttributes.filter(
            option => option.value !== value
          )
        ]
      },
      () =>
        handleSelectable({
          optionsAttributes: this.state.optionsAttributes
        })
    );
  };

  render() {
    const { fieldType } = this.props;
    const { optionsAttributes, itemValue } = this.state;

    return (
      <div className="">
        <hr />
        <div className="display-4" style={{ fontSize: "20px" }}>
          {optionsAttributes.map(option => (
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
          {optionsAttributes.length === 0 ? "Add Item" : "Add Another Item"}
        </button>
      </div>
    );
  }
}

export default SelectableOptions;
