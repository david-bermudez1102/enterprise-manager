import React, { Component } from "react";
import defaultAvatar from "../../default_user.png";
export default class Uploader extends Component {
  state = { file: "", filePreview: "", dragging: false };

  handleOnSubmit = event => {
    event.preventDefault();
    this.props.addOrganization(this.state);
  };

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
      URL.revokeObjectURL(this.state.filePreview);
      this.setState({
        file: e.dataTransfer.files[0],
        filePreview: URL.createObjectURL(e.dataTransfer.files[0])
      });
      e.dataTransfer.clearData();
      this.dragCounter = 0;
    }
  };

  handleChange = event => {
    URL.revokeObjectURL(this.state.filePreview);
    if (event.target.files.length > 0)
      this.setState({
        [event.target.name]: event.target.files[0],
        filePreview: URL.createObjectURL(event.target.files[0])
      });
  };

  render() {
    console.log(this.state);
    return (
      <div
        onDragEnter={this.handleDragEnter}
        onDragOver={this.handleDragOver}
        onDragLeave={this.handleDragLeave}
        onDrop={this.handleDrop}>
        <form onSubmit={this.handleOnSubmit}>
          <label className="circular--landscape shadow" style={{ width: "150px", height: "150px" }}>
            {this.state.filePreview !== "" ? (
              <img src={this.state.filePreview} />
            ) : (
              <img src={defaultAvatar} width="100%" />
            )}
            <input type="file" name="file" className="d-none" onChange={this.handleChange} />
          </label>
        </form>
      </div>
    );
  }
}
