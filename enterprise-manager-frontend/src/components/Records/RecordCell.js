import React, { Component } from "react";

class RecordCell extends Component {
  constructor(props) {
    super(props);
    this.state = { editing: false, newContent: null };
  }

  handleDoubleClick = () => {
    this.setState({ editing: true });
  };

  handleBlur = () => {
    this.setState({ editing: false });
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.setState({ editing: false, valueId: e.target.dataId });
  };

  render() {
    const { values, recordField, record } = this.props;
    const { editing } = this.state;
    const value = values.filter(
      value =>
        value.recordFieldId === recordField.id && value.recordId === record.id
    );
    const content = value.map(value => value.content)[0];

    return (
      <td onDoubleClick={this.handleDoubleClick}>
        {editing ? (
          <div className="position-relative w-100">
            <form
              onSubmit={this.handleSubmit}
              className="m-0 w-100 position-absolute">
              <input
                className="p-0 m-0 overflow-hidden w-100"
                style={{ border: 0, outline: 0 }}
                name="newContent"
                data-id={value.id}
                type="text"
                value={this.state.newContent || content}
                onBlur={this.handleBlur}
                onChange={this.handleChange}
                autoFocus
              />
            </form>
          </div>
        ) : (
          content
        )}
      </td>
    );
  }
}
export default RecordCell;
