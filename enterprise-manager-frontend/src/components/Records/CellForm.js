import React, { Component } from "react";
import { Form, Input } from "antd";

export default class CellForm extends Component {
  constructor(props) {
    super(props);
    const { content, formId, recordId, recordFieldId, organizationId } = props;
    this.state = {
      content: content ? content : "",
      formId,
      recordId,
      recordFieldId,
      organizationId,
    };
  }

  handleChange = e => {
    this.setState({ content: e.target.value });
  };

  handleBlur = () => {
    this.props.handleBlur();
  };

  handleSubmit = () => {
    const { addValue, updateRecord, content } = this.props;
    if (!content) addValue(this.state);
    else if (content !== this.state.content) updateRecord(this.state);
  };

  render() {
    return (
      <Form
        onSubmit={this.handleSubmit}
        initialValues={{ content: this.state.content }}
        style={{ padding: 0, margin: 0 }}>
        <Form.Item name="content" noStyle>
          <Input
            type="text"
            style={{
              border: 0,
              outline: 0,
              padding: 0,
              margin: 0,
              minHeight: "100%",
            }}
            onBlur={this.handleBlur}
            onChange={this.handleChange}
            onPressEnter={this.handleSubmit}
            autoFocus
          />
        </Form.Item>
      </Form>
    );
  }
}
