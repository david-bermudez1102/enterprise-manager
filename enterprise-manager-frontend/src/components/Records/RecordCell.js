import React, { Component } from "react";

class RecordCell extends Component {
  state = { editing: false };

  handleDoubleClick = () => {
    this.setState({ editing: true });
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
        {editing ? content : content}
      </td>
    );
  }
}
export default RecordCell;
