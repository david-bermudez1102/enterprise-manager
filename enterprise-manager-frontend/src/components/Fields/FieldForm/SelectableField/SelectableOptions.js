import React, { Component } from "react";
import cuid from "cuid";
import { Form, Button, Divider, Input, Tag } from "antd";

class SelectableOptions extends Component {
  constructor(props) {
    super(props);
    const { optionsAttributes } = props.field;
    this.itemValue = React.createRef();
    this.state = {
      itemValue: "",
      optionsAttributes: optionsAttributes || [],
    };
  }

  handleChange = event => {
    this.setState({
      ...this.state,
      [event.target.name]: event.target.value,
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
            { value: this.state.itemValue },
          ],
        },
        () =>
          this.props.handleSelectable({
            optionsAttributes: this.state.optionsAttributes,
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
          ),
        ],
      },
      () =>
        handleSelectable({
          optionsAttributes: this.state.optionsAttributes,
        })
    );
  };

  render() {
    const { fieldType } = this.props;
    const { optionsAttributes, itemValue } = this.state;

    return (
      <>
        <Form.Item>
          {optionsAttributes.map(option => (
            <Tag
              className="edit-tag"
              key={cuid()}
              closable
              onClose={() => this.removeItem(option.value)}>
              {option.value}
            </Tag>
          ))}
        </Form.Item>
        <Divider />
        <Form.Item label={`Add item to ${fieldType} field`}>
          <Input
            name="itemValue"
            id="item_value"
            onChange={this.handleChange}
            value={itemValue}
            autoFocus={true}
            ref={this.itemValue}
          />
        </Form.Item>
        <Button onClick={this.handleClick} className="btn btn-secondary shadow">
          {optionsAttributes.length === 0 ? "Add Item" : "Add Another Item"}
        </Button>
      </>
    );
  }
}

export default SelectableOptions;
