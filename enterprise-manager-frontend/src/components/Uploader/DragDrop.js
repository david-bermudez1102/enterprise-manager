import React, { Component } from "react";

export default class DragDrop extends Component {
  state = { dragging: false };

  handleDragOver = e => {
    e.preventDefault();
    e.stopPropagation();
  };

  handleDragEnter = e => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      this.setState({ dragging: true });
    }
  };

  handleDragLeave = e => {
    e.preventDefault();
    e.stopPropagation();
    this.setState({ dragging: false });
  };

  handleDrop = e => {
    e.preventDefault();
    e.stopPropagation();
    this.setState({ dragging: false });
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      this.props.handleDrop(e.dataTransfer.files[0]);
      e.dataTransfer.clearData();
    }
  };

  render() {
    const { children } = this.props;
    return (
      <div
        onDragEnter={this.handleDragEnter}
        onDragOver={this.handleDragOver}
        onDragLeave={this.handleDragLeave}
        onDrop={this.handleDrop}>
        {children}
      </div>
    );
  }
}
